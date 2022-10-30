import {
  GraphQLFieldConfig,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { ProjectModel, ProjectColumnModel, ProjectEntryModel } from "../../models/project";
import { ColumnType, EntryType, ProjectType } from "./project-type";

const projects: GraphQLFieldConfig<any, {}, any> = {
  type: new GraphQLList(ProjectType),
  resolve: async (_, {}) => {
    let result = await ProjectModel.find({}).populate({ path: "columns" }).populate({ path: "entries" });
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
    }).populate({ path: "columns" }).populate({ path: "entries" });
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
    let result = await ProjectModel.findById(id).populate({ path: "columns" }).populate({ path: "entries" });
    return result;
  },
};

const columns = {
  type: GraphQLList(ColumnType),
  resolve: async (_, {}) => {
    let result = await ProjectColumnModel.find({}).populate({ path: "project" }).populate({ path: "entries" });
    return result;
  },
};

const columnById = {
  type: ColumnType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    let result = await ProjectColumnModel.findById(id).populate({ path: "project" }).populate({ path: "entries" });
    return result;
  },
};

const columnsByProject = {
  type: new GraphQLList(ColumnType),
  args: {
    project: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { project }) => {
    let projectById = await ProjectModel.findById(project).populate({ path: "columns" }).populate({ path: "entries" });
    return projectById.columns;
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
    let entryById = await ProjectEntryModel.findById(id).populate({ path: "project" });
    return entryById;
  },
};

const entriesByColumn = {
  type: new GraphQLList(EntryType),
  args: {
    column: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { column }) => {
    let entriesByColumn = await ProjectColumnModel.findById(column).populate({ path: "entries" });
    return entriesByColumn.entries;
  },
};

const projectQueries = {
  projects,
  projectsBySearch,
  projectById: projectById,
  columns,
  columnById,
  columnsByProject,
  entriesByColumn,
  entryById,
};

export default projectQueries;
