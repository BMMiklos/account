import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { ProcessCreateInput, ProcessType, ProcessUpdateInput } from "../project.type";

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
    }
};

const updateProcess = {
    type: ProcessType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        data: { type: GraphQLNonNull(ProcessUpdateInput) },
    }
};

const deleteProcess = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
    }
};

export const processQuerySchemas = {
    processById,
    processesByProject
};

export const processMutationSchemas = {
    createProcess,
    updateProcess,
    deleteProcess
};
