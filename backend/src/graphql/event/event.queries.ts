import { EventModel } from "../../models/event";

const eventById = async (args, res) => {
  try {
    return await EventModel.findById(args.id);
  } catch (error) {
      return new Error(error);
  }
};

const eventsByFilter = async (args, res) => {
  try {
    return await EventModel.find({});
  } catch (error) {
      return new Error(error);
  }
};

export const eventQueries = {
  eventById,
  eventsByFilter
};
