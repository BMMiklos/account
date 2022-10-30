import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLID,
  GraphQLNonNull,
} from "graphql";
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
    return await ProjectModel.findByIdAndUpdate(id, data)
      .populate({ path: "processes" })
      .populate({ path: "entries" });
  },
};

const deleteProject = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    let projectById = await ProjectModel.findById(id);

    if (projectById) {
      await ProjectProcessModel.updateMany({ project: id }, { project: null });

      await ProjectEntryModel.updateMany({ project: id }, { project: null });
    }

    let result = await ProjectModel.deleteOne({ _id: id });
    return result.deletedCount ? true : false;
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
      throw new Error(error);
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

      // let areEntriesEqual = false;
      
      await ProjectProcessModel.findById(id)
        .populate({
          path: "entries",
        })
        .then(async (process) => {
          if (process) {
            if (data.entryOrder) {
              if (data.entryOrder.length == process.entries.length) {
                let entriesUnion = process.entries.filter((entry) => {
                  let isEntryExsistsEverywhere = false;
                  for (const entryByOrder of data.entryOrder) {
                    if (entry._id == entryByOrder) {
                      isEntryExsistsEverywhere = true;
                    }
                  }
                  return isEntryExsistsEverywhere;
                });

                if (entriesUnion.length == process.entries.length) {
                  // areEntriesEqual = true;
                } else {
                  throw `Not the same entries are in the request array!`;
                }
              } else {
                throw `The given id array is not the same length as in the database!`;
              }
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
      console.log(error);
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
    }

    let result = await ProjectProcessModel.deleteOne({ _id: id });
    return result.deletedCount ? true : false;
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

      let projectById = await ProjectModel.findById(data.project);

      if (projectById) {
        if (data.process) {
          let processById = await ProjectProcessModel.findById(data.process);

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
            throw `Process with this id ${data.process} isn't exsists!`;
          }
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
    return await ProjectEntryModel.findByIdAndUpdate(id, data).populate({
      path: "project",
    });
  },
};

const deleteEntry = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { id }) => {
    await ProjectModel.updateMany({ entries: id }, { $pull: { entries: id } });
    await ProjectProcessModel.updateMany(
      { entries: id },
      { $pull: { entries: id } }
    );
    let result = await ProjectEntryModel.deleteOne({
      _id: id,
    });
    return result.deletedCount ? true : false;
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
};

export default projectMutations;
