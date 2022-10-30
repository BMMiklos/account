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
    let project = new ProjectModel({
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    let result = await project.save();
    return result;
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
    project: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(ProcessCreateInput) },
  },
  resolve: async (_, { project, data }) => {
    let process;

    let projectById = await ProjectModel.findById(project);

    if (projectById) {
      let document = new ProjectProcessModel({
        title: data.title,
        description: data.description ? data.description : null,
        project: project,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      process = await document.save();

      await ProjectModel.findByIdAndUpdate(projectById._id, {
        $push: { processes: process._id },
      });
    }

    return process;
  },
};

const updateProcess = {
  type: ProcessType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(ProcessUpdateInput) },
  },
  resolve: async (_, { id, data }) => {
    return await ProjectProcessModel.findByIdAndUpdate(id, data)
      .populate({ path: "project" })
      .populate({ path: "entries" });
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
    project: { type: GraphQLNonNull(GraphQLID) },
    process: { type: GraphQLID },
    data: { type: GraphQLNonNull(EntryCreateInput) },
  },
  resolve: async (_, { project, process, data }) => {
    let entry;

    let projectById = await ProjectModel.findById(project);

    if (projectById) {
      if (process) {
        let processById = await ProjectProcessModel.findById(process);

        if (processById) {
          entry = await ProjectEntryModel.create({
            project: projectById._id,
            title: data.title,
            description: data.description,
          });

          await ProjectProcessModel.updateOne(
            {
              _id: process,
            },
            {
              $push: { entries: entry._id },
            }
          );
        }
      } else {
        entry = await ProjectEntryModel.create({
          project: projectById._id,
          title: data.title,
          description: data.description,
        });
      }
    }

    if (entry) {
      await ProjectModel.updateOne(
        {
          _id: project,
        },
        {
          $push: { entries: entry._id },
        }
      );
    }

    return entry;
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
