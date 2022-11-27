import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { EntryCreateInput, EntryType, EntryUpdateInput } from "../project.type";

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

const queries = {
    entryById,
    entriesByProcess
};

const mutations = {
    createEntry,
    updateEntry,
    deleteEntry,
    setEntryToProcess,
    removeEntryFromProcess,
    moveProcess,
    moveEntry
};
