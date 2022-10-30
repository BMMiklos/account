import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

let ColumnType: GraphQLObjectType;
let EntryType: GraphQLObjectType;

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => {
    return {
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      columns: { type: GraphQLList(ColumnType) },
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

ColumnType = new GraphQLObjectType({
  name: "Column",
  fields: () => {
    return {
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      order: { type: GraphQLInt },
      project: { type: ProjectType },
      entries: { type: new GraphQLList(EntryType) },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
    };
  },
});

const ColumnCreateInput = new GraphQLInputObjectType({
  name: "ColumnCreateInput",
  fields: {
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    order: { type: GraphQLInt },
  },
});

const ColumnUpdateInput = new GraphQLInputObjectType({
  name: "ColumnUpdateInput",
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    order: { type: GraphQLInt },
  },
});

EntryType = new GraphQLObjectType({
  name: "Entry",
  fields: {
    _id: { type: GraphQLString },
    order: { type: GraphQLInt },
    project: { type: ProjectType },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const EntryCreateInput = new GraphQLInputObjectType({
  name: "EntryCreateInput",
  fields: {
    order: { type: GraphQLInt },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  },
});

const EntryUpdateInput = new GraphQLInputObjectType({
  name: "EntryUpdateInput",
  fields: {
    order: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

export {
  ProjectType,
  ProjectCreateInput,
  ProjectUpdateInput,
  ColumnType,
  ColumnCreateInput,
  ColumnUpdateInput,
  EntryType,
  EntryCreateInput,
  EntryUpdateInput
};
