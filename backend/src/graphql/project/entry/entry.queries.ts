import {
    GraphQLFieldConfig,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import {
    ProjectModel,
    ProjectProcessModel,
    ProjectEntryModel,
} from "../../../models/project";
import { ProcessType, EntryType, ProjectType } from "../project.type";

const entryById = {
    type: EntryType,
    args: {
        id: {
            type: GraphQLNonNull(GraphQLID),
        },
    },
    resolve: async (_, { id }) => {
        try {
            let entryById = await ProjectEntryModel.findById(id).populate({
                path: "project",
            });
            return entryById;
        } catch (error) {
            return new Error(error);
        }
    },
};

const entriesByProcess = {
    type: new GraphQLList(EntryType),
    args: {
        process: {
            type: GraphQLNonNull(GraphQLID),
        },
    },
    resolve: async (_, { process }) => {
        try {
            let entriesByProcess = await ProjectProcessModel.findById(
                process
            ).populate({
                path: "entries",
            });
            return entriesByProcess.entries;
        } catch (error) {
            return new Error(error);
        }
    },
};

const entryQueries = {
    entriesByProcess,
    entryById,
};

export default entryQueries;
