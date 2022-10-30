import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";
import {
  ProjectProcessModel,
  ProjectEntryModel,
  ProjectModel,
} from "../../models/project";
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
} from "./project.type";

const createProject = {
  type: ProjectType,
  args: {
    data: { type: GraphQLNonNull(ProjectCreateInput) },
  },
  resolve: async (_, { data }) => {
    try {
      let project = new ProjectModel({
        title: data.title,
        description: data.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      let result = await project.save();
      return result;
    } catch (error) {
      return new Error(error);
    }
  },
};

const updateProject = {
  type: ProjectType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(ProjectUpdateInput) },
  },
  resolve: async (_, { id, data }) => {
    try {
      await ProjectModel.findById(id)
        .populate({ path: "processes" })
        .then(async (project) => {
          if (project) {
            if (data.processOrder) {
              project.processes.every((process) => {
                for (const processByOrder of data.processOrder) {
                  if (processByOrder == process._id) {
                    return true;
                  }
                }
                throw "The given processes are not the same!";
              });
            }
          } else {
            throw `No project is exsits with the given id ${id}!`;
          }
        });

      return await ProjectModel.findByIdAndUpdate(id, {
        ...data,
        ...(data.processOrder && data.processOrder),
      })
        .populate({ path: "processes" })
        .populate({ path: "entries" });
    } catch (error) {
      return new Error(error);
    }
  },
};

const deleteProject = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    try {
      let projectById = await ProjectModel.findById(id);

      if (projectById) {
        await ProjectProcessModel.deleteMany({ project: id });
        await ProjectEntryModel.deleteMany({ project: id });
      } else {
        throw `There is no project with the given id ${id}!`;
      }

      let result = await ProjectModel.deleteOne({ _id: id });
      return result.deletedCount ? true : false;
    } catch (error) {
      return new Error(error);
    }
  },
};

const createProcess = {
  type: ProcessType,
  args: {
    data: { type: GraphQLNonNull(ProcessCreateInput) },
  },
  resolve: async (_, { data }) => {
    try {
      let process;

      let projectById = await ProjectModel.findById(data.project);

      if (projectById) {
        let document = new ProjectProcessModel({
          title: data.title,
          description: data.description ? data.description : null,
          project: data.project,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        process = await document.save();

        await ProjectModel.findByIdAndUpdate(projectById._id, {
          $push: { processes: process._id },
        });
      } else {
        throw `Process with this id ${data.process} isn't exsists!`;
      }

      return process;
    } catch (error) {
      return new Error(error);
    }
  },
};

const updateProcess = {
  type: ProcessType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(ProcessUpdateInput) },
  },
  resolve: async (_, { id, data }) => {
    try {
      await ProjectProcessModel.findById(id)
        .populate({
          path: "entries",
        })
        .then(async (process) => {
          if (process) {
            if (data.entryOrder) {
              process.entries.every((process) => {
                for (const entryByOrder of data.entryOrder) {
                  if (entryByOrder == process._id) {
                    return true;
                  }
                }
                throw "The given entries are not the same!";
              });
            }
          } else {
            throw `No process is exsits with this id ${id}!`;
          }
        });

      return await ProjectProcessModel.findByIdAndUpdate(id, {
        ...data,
        ...(data.entryOrder && { entries: data.entryOrder }),
      })
        .populate({ path: "project" })
        .populate({ path: "entries" });
    } catch (error) {
      return new Error(error);
    }
  },
};

const deleteProcess = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    try {
      let processById = await ProjectProcessModel.findById(id);

      if (processById) {
        await ProjectModel.updateMany(
          {
            processes: processById._id,
          },
          {
            $pull: { processes: processById._id },
          }
        );
      } else {
        throw `The process with the given id is not found ${id}!`;
      }

      let result = await ProjectProcessModel.deleteOne({ _id: id });
      return result.deletedCount ? true : false;
    } catch (error) {
      return new Error(error);
    }
  },
};

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
            _id: data.project,
            project: data.process,
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

const projectMutations = {
  createProject: createProject,
  updateProject: updateProject,
  deleteProject: deleteProject,
  createProcess: createProcess,
  updateProcess: updateProcess,
  deleteProcess: deleteProcess,
  createEntry: createEntry,
  deleteEnty: deleteEntry,
  updateEntry: updateEntry,
  setEntryToProcess: setEntryToProcess,
  removeEntryFromProcess: removeEntryFromProcess,
};

export default projectMutations;
