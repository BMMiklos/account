import { GraphQLBoolean, GraphQLEnumType, GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    from: { type: GraphQLInt },
    to: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  }
});

const EventByFilterInputType = new GraphQLInputObjectType({
  name: "EventByFilterInput",
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    from: { type: GraphQLInt },
    to: { type: GraphQLInt },
    createdAt: { type: GraphQLInt },
    updatedAt: { type: GraphQLInt }
  },
});

const EventCreateInput = new GraphQLInputObjectType({
  name: "EventCreateInput",
  fields: {
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
    type: { type: GraphQLNonNull(GraphQLString) },
    from: { type: GraphQLNonNull(GraphQLInt) },
    to: { type: GraphQLInt },
    createdAt: { type: GraphQLInt },
    updatedAt: { type: GraphQLInt }
  },
});

const EventUpdateInput = new GraphQLInputObjectType({
  name: "EventUpdateInput",
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    from: { type: GraphQLInt },
    to: { type: GraphQLInt },
    createdAt: { type: GraphQLInt },
    updatedAt: { type: GraphQLInt }
  },
});

export const eventById = {
  type: EventType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) }
  }
};

export const eventsByFilter = {
  type: GraphQLList(EventType),
  args: {
    eventFilter: { type: GraphQLNonNull(EventByFilterInputType) }
  }
};

export const createEvent = {
  type: EventType,
  args: {
    data: { type: GraphQLNonNull(EventCreateInput) }
  }
};

export const updateEvent = {
  type: EventType,
  args: {
    data: { type: GraphQLNonNull(EventUpdateInput) }
  }
};

export const deleteEvent = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) }
  }
};

export const eventQuerySchemas = {
  eventById,
  eventsByFilter
};

export const eventMutationSchemas = {
  createEvent,
  updateEvent,
  deleteEvent
};
