import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
} from "graphql";
import {
    ProjectProcessModel,
    ProjectEntryModel,
    ProjectModel,
} from "../../../models/project";
import {
    ProcessCreateInput,
    ProcessType,
    ProcessUpdateInput,
    EntryCreateInput,
    EntryType,
    EntryUpdateInput,
    ProjectCreateInput,
    ProjectType,
    ProjectUpdateInput,
} from "../project.type";

const createEntry = {
    type: EntryType,
    args: {
        data: { type: GraphQLNonNull(EntryCreateInput) },
    },
    resolve: async (_, { data }) => {
        try {
            let entry;

            let projectById = await ProjectModel.findOne({
                _id: data.project,
            });

            if (projectById) {
                if (data.process) {
                    await ProjectProcessModel.findOne({
                        _id: data.process,
                        project: [data.project],
                    }).then(async (processById) => {
                        if (processById) {
                            entry = await ProjectEntryModel.create({
                                project: projectById._id,
                                title: data.title,
                                description: data.description,
                            });

                            await ProjectProcessModel.updateOne(
                                {
                                    _id: data.process,
                                },
                                {
                                    $push: { entries: entry._id },
                                }
                            );
                        } else {
                            throw `Process with this id ${data.process} isn't exsists, or the process is not joined to the project!`;
                        }
                    });
                } else {
                    entry = await ProjectEntryModel.create({
                        project: projectById._id,
                        title: data.title,
                        description: data.description,
                    });
                }
            } else {
                throw `Project with this id ${data.project} isn't exsists!`;
            }

            if (entry) {
                await ProjectModel.updateOne(
                    {
                        _id: data.project,
                    },
                    {
                        $push: { entries: entry._id },
                    }
                );
            }

            return entry;
        } catch (error) {
            return new Error(error);
        }
    },
};

const updateEntry = {
    type: EntryType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        data: { type: GraphQLNonNull(EntryUpdateInput) },
    },
    resolve: async (_, { id, data }) => {
        try {
            return await ProjectEntryModel.findByIdAndUpdate(id, data).populate({
                path: "project",
            });
        } catch (error) {
            return new Error(error);
        }
    },
};

const deleteEntry = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_, { id }) => {
        try {
            await ProjectModel.updateMany(
                { entries: id },
                { $pull: { entries: id } }
            );
            await ProjectProcessModel.updateMany(
                { entries: id },
                { $pull: { entries: id } }
            );
            let result = await ProjectEntryModel.deleteOne({
                _id: id,
            });
            return result.deletedCount ? true : false;
        } catch (error) {
            return new Error(error);
        }
    },
};

const setEntryToProcess = {
    type: GraphQLBoolean,
    args: {
        entry: { type: GraphQLNonNull(GraphQLID) },
        process: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_, { entry: entryId, process: processId }) => {
        try {
            let result = false;

            await ProjectModel.findOne({
                entries: entryId,
                processes: processId,
            }).then(async (project) => {
                if (project) {
                    await ProjectProcessModel.findOne({
                        _id: processId,
                        entries: entryId,
                    }).then(async (process) => {
                        if (process) {
                            result = false;
                        } else {
                            await ProjectEntryModel.findById(entryId).then(async (entry) => {
                                if (entry) {
                                    let updateResult = await ProjectProcessModel.updateMany(
                                        { _id: processId },
                                        {
                                            $push: { entries: entryId },
                                        }
                                    );

                                    result = updateResult.modifiedCount ? true : false;
                                } else {
                                    throw `There is no entry with the given id ${entryId}`;
                                }
                            });
                        }
                    });
                } else {
                    throw `The given process and entity are not in the same project!`;
                }
            });

            return result;
        } catch (error) {
            return new Error(error);
        }
    },
};

const removeEntryFromProcess = {
    type: GraphQLBoolean,
    args: {
        entry: { type: GraphQLNonNull(GraphQLID) },
        process: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_, { entry, process }) => {
        try {
            let result = await ProjectProcessModel.updateMany(
                {
                    _id: process,
                },
                {
                    $pull: { entries: entry },
                }
            );

            return result.modifiedCount ? true : false;
        } catch (error) {
            return new Error(error);
        }
    },
};

const moveProcess = {
    type: GraphQLBoolean,
    args: {
        project: { type: GraphQLNonNull(GraphQLID) },
        process: { type: GraphQLNonNull(GraphQLID) },
        index: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (
        _,
        { project: projectId, process: processId, index: processIndex }
    ) => {
        try {
            await ProjectModel.findById(projectId).then(async (project) => {
                if (project) {
                    let process = await ProjectProcessModel.findById(processId);
                    if (!process) {
                        throw `The process cannot be found with the given id ${processId}!`;
                    }

                    let processes = [...project.processes];
                    const processIsJoinedToProject = processes.some(
                        (processInProject) => processInProject._id == processId
                    );
                    if (processIsJoinedToProject) {
                        let actualProcessIndex = processes.findIndex(
                            (processInProject) => processInProject._id == processId
                        );

                        processes.splice(actualProcessIndex, 1);
                        processes.splice(processIndex, 0, processId);

                        await ProjectModel.updateMany(
                            {
                                _id: projectId,
                            },
                            {
                                processes: processes,
                            }
                        );
                    } else {
                        throw `The process is not joined to the project ${projectId}!`;
                    }
                } else {
                    throw `There is no project with the given id ${projectId}`;
                }

                return true;
            });
        } catch (error) {
            return new Error(error);
        }
    },
};

const moveEntry = {
    type: GraphQLBoolean,
    args: {
        project: { type: GraphQLNonNull(GraphQLID) },
        process: { type: GraphQLID },
        entry: { type: GraphQLNonNull(GraphQLID) },
        index: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (
        _,
        {
            project: projectId,
            process: processId,
            entry: entryId,
            index: entryIndex,
        }
    ) => {
        try {
            await ProjectModel.findById(projectId).then(async (project) => {
                if (project) {
                    await ProjectEntryModel.findById(entryId).then(async (entry) => {
                        if (entry) {
                            const entryActualProcess = await ProjectProcessModel.findOne({
                                entries: entryId,
                            });

                            if (processId) {
                                // If there is process id given that means, i have to remove the entry from the old one, and join to the new one

                                const newEntryProcess = await ProjectProcessModel.findOne({
                                    _id: processId,
                                });

                                if (newEntryProcess.project != entry.project) {
                                    throw `The two entities are not in the same project!`;
                                }

                                if (newEntryProcess) {
                                    // if the entry weren't connected to any processes
                                    if (entryActualProcess) {
                                        await ProjectProcessModel.updateOne(
                                            {
                                                _id: entryActualProcess._id,
                                            },
                                            {
                                                $pull: {
                                                    entries: entryId,
                                                },
                                            }
                                        );
                                    }

                                    let newProcessEntries = [...newEntryProcess.entries];
                                    newProcessEntries.splice(
                                        newProcessEntries.length,
                                        0,
                                        entryId
                                    );

                                    await ProjectProcessModel.updateOne(
                                        {
                                            _id: newEntryProcess._id,
                                        },
                                        {
                                            entries: newProcessEntries,
                                        }
                                    );
                                } else {
                                    throw `There is no process with the given id ${processId}!`;
                                }
                            } else {
                                // If there is no process id given, it means that only a sort is goning to happen in the process
                                if (entryActualProcess) {
                                    let actualEntryArray = [...entryActualProcess.entries];
                                    let actualEntryIndex = actualEntryArray.findIndex(
                                        (actualEntryArrayId) => actualEntryArrayId == entryId
                                    );

                                    actualEntryArray.splice(actualEntryIndex, 1);
                                    actualEntryArray.splice(entryIndex, 0, entryIndex);

                                    await ProjectProcessModel.updateOne(
                                        {
                                            _id: entryActualProcess._id,
                                        },
                                        {
                                            entries: actualEntryArray,
                                        }
                                    );
                                }
                            }
                        } else {
                            throw `There is no entry with the given id ${entryId}!`;
                        }
                    });
                } else {
                    throw `There is no project with the given id ${projectId}`;
                }
            });
        } catch (error) {
            return new Error(error);
        }
    },
};

const entryMutations = {
    createEntry: createEntry,
    deleteEnty: deleteEntry,
    updateEntry: updateEntry,
    setEntryToProcess: setEntryToProcess,
    removeEntryFromProcess: removeEntryFromProcess,
    moveProcess: moveProcess,
    moveEntry: moveEntry,
};

export default entryMutations;
