import { GraphQLList, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLBoolean } from "graphql";
import { ProjectType, ProjectUpdateInput, ProjectCreateInput } from "./project.type";

const project = {
    type: new GraphQLList(ProjectType),
};

const projectsBySearch = {
    type: new GraphQLList(ProjectType),
    args: {
        searchQuery: {
            type: GraphQLNonNull(GraphQLString),
        },
    }
};

const projectById = {
    type: ProjectType,
    args: {
        id: {
            type: GraphQLNonNull(GraphQLID),
        },
    }
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
    projectById
};

export const projectMutationSchemas = {
    createProject,
    updateProject,
    deleteProject
};
