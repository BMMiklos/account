import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from "graphql";

let ProcessType: GraphQLObjectType;
let EntryType: GraphQLObjectType;

const ProjectType = new GraphQLObjectType({
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
    processOrder: { type: GraphQLList(GraphQLID) }
  },
});

ProcessType = new GraphQLObjectType({
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
    entryOrder: { type: GraphQLList(GraphQLID) }
  },
});

EntryType = new GraphQLObjectType({
  name: "Entry",
  fields: {
    _id: { type: GraphQLString },
    project: { type: ProjectType },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const EntryCreateInput = new GraphQLInputObjectType({
  name: "EntryCreateInput",
  fields: {
    project: { type: GraphQLNonNull(GraphQLID) },
    process: { type: GraphQLID },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  },
});

const EntryUpdateInput = new GraphQLInputObjectType({
  name: "EntryUpdateInput",
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

export {
  ProjectType,
  ProjectCreateInput,
  ProjectUpdateInput,
  ProcessType,
  ProcessCreateInput,
  ProcessUpdateInput,
  EntryType,
  EntryCreateInput,
  EntryUpdateInput
};
