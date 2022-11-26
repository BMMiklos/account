import {
  GraphQLFieldConfig,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import {
  ProjectModel,
  ProjectProcessModel,
  ProjectEntryModel,
} from "../../models/project";
import { ProcessType, EntryType, ProjectType } from "./project.type";

const projects: GraphQLFieldConfig<any, {}, any> = {
  type: new GraphQLList(ProjectType),
  resolve: async (_, {}) => {
    try {
      let result = await ProjectModel.find({})
        .populate({ path: "processes" })
        .populate({ path: "entries" });
      return result;
    } catch (error) {
      return new Error(error);
    }
  },
};

const projectsBySearch = {
  type: new GraphQLList(ProjectType),
  args: {
    searchQuery: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { searchQuery }) => {
    try {
      let result = await ProjectModel.find({
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      })
        .populate({ path: "processes" })
        .populate({ path: "entries" });
      return result;
    } catch (error) {
      return new Error(error);
    }
  },
};

const projectById = {
  type: ProjectType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    try {
      let result = await ProjectModel.findById(id)
        .populate({ path: "processes" })
        .populate({ path: "entries" });
      return result;
    } catch (error) {
      return new Error(error);
    }
  },
};

const projectQueries = {
  projects,
  projectsBySearch,
  projectById,
};

export default projectQueries;
