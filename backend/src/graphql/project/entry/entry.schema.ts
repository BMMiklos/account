import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProjectType } from "../project/project.schema";

export const EntryType = new GraphQLObjectType({
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

const entryById = {
    type: EntryType,
    args: {
        id: {
            type: GraphQLNonNull(GraphQLID),
        },
    }
};

const entriesByProcess = {
    type: new GraphQLList(EntryType),
    args: {
        process: {
            type: GraphQLNonNull(GraphQLID),
        },
    }
};

const createEntry = {
    type: EntryType,
    args: {
        data: { type: GraphQLNonNull(EntryCreateInput) },
    }
};

const updateEntry = {
    type: EntryType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        data: { type: GraphQLNonNull(EntryUpdateInput) },
    }
};

const deleteEntry = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
    }
};

const setEntryToProcess = {
    type: GraphQLBoolean,
    args: {
        entry: { type: GraphQLNonNull(GraphQLID) },
        process: { type: GraphQLNonNull(GraphQLID) },
    }
};

const removeEntryFromProcess = {
    type: GraphQLBoolean,
    args: {
        entry: { type: GraphQLNonNull(GraphQLID) },
        process: { type: GraphQLNonNull(GraphQLID) },
    }
};

const moveProcess = {
    type: GraphQLBoolean,
    args: {
        project: { type: GraphQLNonNull(GraphQLID) },
        process: { type: GraphQLNonNull(GraphQLID) },
        index: { type: GraphQLNonNull(GraphQLInt) },
    }
};

const moveEntry = {
    type: GraphQLBoolean,
    args: {
        project: { type: GraphQLNonNull(GraphQLID) },
        process: { type: GraphQLID },
        entry: { type: GraphQLNonNull(GraphQLID) },
        index: { type: GraphQLNonNull(GraphQLInt) },
    }
};

export const entryQuerySchemas = {
    entryById,
    entriesByProcess
};

export const entryMutationSchemas = {
    createEntry,
    updateEntry,
    deleteEntry,
    setEntryToProcess,
    removeEntryFromProcess,
    moveProcess,
    moveEntry
};
