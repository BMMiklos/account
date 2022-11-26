import { GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from "graphql";
import entryMutations from "./project/entry/entry.mutations";
import entryQueries from "./project/entry/entry.queries";
import processMutations from "./project/process/process.mutations";
import processQueries from "./project/process/process.queries";
import projectMutations from "./project/project.mutations";
import projectQueries from "./project/project.queries";

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

export { queryType, mutationType, PaginationInputType };
