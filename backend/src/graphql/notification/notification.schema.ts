import { GraphQLBoolean, GraphQLScalarType, GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

const NotificationSettingsType = new GraphQLObjectType({
  name: "NotificationSettings",
  fields: {
    _id: { type: GraphQLID },
    notification: { type: GraphQLID },
    notificationAt: { type: GraphQLList(GraphQLInt) },
    seenAt: { type: GraphQLList(GraphQLInt) },
    sendEmail: { type: GraphQLBoolean }
  }
});

const Notification = new GraphQLObjectType({
  name: "Notification",
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    message: { type: GraphQLString },
    settings: { type: NotificationSettingsType },
    createdAt: { type: GraphQLInt },
    updatedAt: { type: GraphQLInt }
  }
});

const NotificationSettingsInput = new GraphQLInputObjectType({
  name: "NotificationSettingsInput",
  fields: {
    sendEmail: { type: GraphQLBoolean },
    notificationsAt: { type: GraphQLInt }
  }
});

const NotificationCreateInput = new GraphQLInputObjectType({
  name: "NotificationCreateInput",
  fields: {
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    message: { type: GraphQLString },
    settings: { type: NotificationSettingsInput }
  }
});

const NotificationUpdateInput = new GraphQLInputObjectType({
  name: "NotificationUpdateInput",
  fields: {
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    message: { type: GraphQLString },
    settings: { type: NotificationSettingsInput }
  }
});

const createNotification = {
  type: Notification,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(NotificationCreateInput) },
  }
};

const updateNotification = {
  type: Notification,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLNonNull(NotificationUpdateInput) }
  }
};

const readNotification = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  }
};

const deleteNotification = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  }
};
