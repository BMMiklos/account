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
          if (!project) {
            throw `No project is exsits with the given id ${id}!`;
          }
        });

      return await ProjectModel.findByIdAndUpdate(id, {
        ...data,
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
          if (!process) {
            throw `No process is exsits with this id ${id}!`;
          }
        });

      return await ProjectProcessModel.findByIdAndUpdate(id, {
        ...data,
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

const projectMutations = {
  createProject: createProject,
  updateProject: updateProject,
  deleteProject: deleteProject,
};

export default projectMutations;
