import { GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from "graphql";
import {
  processQuerySchemas,
  processMutationSchemas,
} from "./project/process/process.schema";
import {
  entryQuerySchemas,
  entryMutationSchemas,
} from "./project/entry/entry.schema";
import {
  projectQuerySchemas,
  projectMutationSchemas,
} from "./project/project/project.schema";
import {
  eventQuerySchemas,
  eventMutationSchemas
} from "./event/event.schema";
import projectQueries from "./project/project/project.queries";
import projectMutations from "./project/project/project.mutations";
import entryQueries from "./project/entry/entry.queries";
import entryMutations from "./project/entry/entry.mutations";
import processQueries from "./project/process/process.queries";
import processMutations from "./project/process/process.mutations";
import { safeMutationSchemas, safeQuerySchemas } from "./safe/safe.schema";
import { safeQueries } from "./safe/safe.queries";
import { safeMutations } from "./safe/safe.mutations";
import { eventQueries } from "./event/event.queries";
import { eventMutations } from "./event/event.mutations";
import { notificaitonQuerySchemas, notificationMutationSchemas } from "./notification/notification.schema";
import notificationMutations from "./notification/notification.mutations";
import notificationQueries from "./notification/notification.queries";

const PaginationInputType = new GraphQLInputObjectType({
  name: "PaginationInput",
  fields: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
  },
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...projectQuerySchemas,
    ...entryQuerySchemas,
    ...processQuerySchemas,
    ...safeQuerySchemas,
    ...eventQuerySchemas
  },
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...projectMutationSchemas,
    ...entryMutationSchemas,
    ...processMutationSchemas,
    ...safeMutationSchemas,
    ...eventMutationSchemas,
    ...notificaitonQuerySchemas,
    ...notificationMutationSchemas,
  },
});

export const projectResolvers = {
  ...projectQueries,
  ...projectMutations,
  ...entryQueries,
  ...entryMutations,
  ...processQueries,
  ...processMutations,
  ...safeQueries,
  ...safeMutations,
  ...eventQueries,
  ...eventMutations,
  ...notificationQueries,
  ...notificationMutations,
};

export { queryType, mutationType, PaginationInputType };
