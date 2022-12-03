import { GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from "graphql";
import { processQueries, processMutations  } from "./project/process/process.schema";
import { entryQueries, entryMutations } from "./project/entry/entry.schema";
import { projectQueries, projectMutations } from "./project/project.schema";

const PaginationInputType = new GraphQLInputObjectType({
  name: "PaginationInput",
  fields: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...projectQueries,
    ...entryQueries,
    ...processQueries
  },
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...projectMutations,
    ...entryMutations,
    ...processMutations
  },
});

export const projectResolvers = {};

export { queryType, mutationType, PaginationInputType };
