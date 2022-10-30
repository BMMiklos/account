import { GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from "graphql";
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
  },
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...projectMutations,
  },
});

export { queryType, mutationType, PaginationInputType };
