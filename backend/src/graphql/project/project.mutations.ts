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

const projectMutations = {
  createProject: createProject,
  updateProject: updateProject,
  deleteProject: deleteProject,
};

export default projectMutations;
