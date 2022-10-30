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
    let result = await ProjectModel.find({})
      .populate({ path: "processes" })
      .populate({ path: "entries" });
    return result;
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
    let result = await ProjectModel.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .populate({ path: "processes" })
      .populate({ path: "entries" });
    return result;
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
    let result = await ProjectModel.findById(id)
      .populate({ path: "processes" })
      .populate({ path: "entries" });
    return result;
  },
};

const processById = {
  type: ProcessType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    let result = await ProjectProcessModel.findById(id)
      .populate({ path: "project" })
      .populate({ path: "entries" });
    return result;
  },
};

const processesByProject = {
  type: new GraphQLList(ProcessType),
  args: {
    project: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { project }) => {
    let projectById = await ProjectModel.findById(project)
      .populate({ path: "processes" })
      .populate({ path: "entries" });
    return projectById.processes;
  },
};

const entryById = {
  type: EntryType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    let entryById = await ProjectEntryModel.findById(id).populate({
      path: "project",
    });
    return entryById;
  },
};

const entriesByProcess = {
  type: new GraphQLList(EntryType),
  args: {
    process: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { process }) => {
    let entriesByProcess = await ProjectProcessModel.findById(process).populate({
      path: "entries",
    });
    return entriesByProcess.entries;
  },
};

const projectQueries = {
  projects,
  projectsBySearch,
  projectById,
  processById,
  processesByProject,
  entriesByProcess,
  entryById,
};

export default projectQueries;
