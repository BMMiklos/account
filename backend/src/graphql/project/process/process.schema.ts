import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { EntryType } from "../entry/entry.schema";
import { ProjectType } from "../project/project.schema";

export const ProcessType = new GraphQLObjectType({
  name: "Process",
  fields: () => {
    return {
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      project: { type: ProjectType },
      entries: { type: new GraphQLList(EntryType) },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
    };
  },
});

const ProcessCreateInput = new GraphQLInputObjectType({
  name: "ProcessCreateInput",
  fields: {
    project: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  },
});

const ProcessUpdateInput = new GraphQLInputObjectType({
  name: "ProcessUpdateInput",
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const processById = {
  type: ProcessType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
};

const processesByProject = {
  type: new GraphQLList(ProcessType),
  args: {
    project: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
};

const createProcess = {
  type: ProcessType,
  args: {
    data: { type: GraphQLNonNull(ProcessCreateInput) },
  },
};

const updateProcess = {
  type: ProcessType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(ProcessUpdateInput) },
  },
};

const deleteProcess = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
};

export const processQuerySchemas = {
  processById,
  processesByProject,
};

export const processMutationSchemas = {
  createProcess,
  updateProcess,
  deleteProcess,
};
