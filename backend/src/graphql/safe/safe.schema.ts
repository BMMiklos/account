import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const SafeType = new GraphQLObjectType({
    name: "Safe",
    fields: {
        _id: { type: GraphQLID },
        label: { type: GraphQLString },
        secret: { type: GraphQLString },
        // hash: { type: GraphQLString },
        description: { type: GraphQLString },
    }
});

export const SafeFilterInput = new GraphQLInputObjectType({
    name: "SafeFilterInput",
    fields: {
        label: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

export const SafeCreateInput = new GraphQLInputObjectType({
    name: "SafeCreateInput",
    fields: {
        label: { type: GraphQLNonNull(GraphQLString) },
        secret: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
    }
});

export const SafeUpdateInput = new GraphQLInputObjectType({
    name: "SafeUpdateInput",
    fields: {
        label: { type: GraphQLString },
        secret: { type: GraphQLString },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
    }
});

export const safes = {
    type: GraphQLList(SafeType),
    args: {
        safeFilter: { type: GraphQLNonNull(SafeFilterInput) }
    }
};

export const safeById = {
    type: SafeType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        password: { type: GraphQLString }
    }
};

export const createSafe = {
    type: SafeType,
    args: {
        data: { type: GraphQLNonNull(SafeCreateInput) }
    }
};

export const updateSafe = {
    type: SafeType,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        password: { type: GraphQLString },
        data: { type: GraphQLNonNull(SafeUpdateInput) }
    }
};

export const deleteSafe = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        password: { type: GraphQLString }
    }
};

export const safeQuerySchemas = {
    safes,
    safeById
};

export const safeMutationSchemas = {
    createSafe,
    updateSafe,
    deleteSafe
};
