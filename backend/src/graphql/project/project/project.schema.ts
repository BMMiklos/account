import {
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from "graphql";
import { EntryType } from "../entry/entry.schema";
import { ProcessType } from "../process/process.schema";

export const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => {
    return {
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      processes: { type: GraphQLList(ProcessType) },
      entries: { type: GraphQLList(EntryType) },
      description: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
    };
  },
});

const ProjectCreateInput = new GraphQLInputObjectType({
  name: "ProjectCreateInput",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  },
});

const ProjectUpdateInput = new GraphQLInputObjectType({
  name: "ProjectUpdateInput",
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const project = {
  type: new GraphQLList(ProjectType),
};

const projectsBySearch = {
  type: new GraphQLList(ProjectType),
  args: {
    searchQuery: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
};

const projectById = {
  type: ProjectType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
};

const createProject = {
  type: ProjectType,
  args: {
    data: { type: GraphQLNonNull(ProjectCreateInput) },
  },
};

const updateProject = {
  type: ProjectType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(ProjectUpdateInput) },
  },
};

const deleteProject = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
};

export const projectQuerySchemas = {
  project,
  projectsBySearch,
  projectById,
};

export const projectMutationSchemas = {
  createProject,
  updateProject,
  deleteProject,
};
