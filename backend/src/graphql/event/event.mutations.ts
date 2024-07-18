import { EventModel } from "../../models/event";

const createEvent = async (args, res) => {
  try {
    const event = new EventModel({
      title: args.data.title,
      description: args.data.description,
      type: args.data.type,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await event.save();
  } catch (error) {
    return new Error(error);
  }
};

const updateEvent = async (args, res) => {
  try {
    
    return await EventModel.findByIdAndUpdate(args.id, {
      ...args.data,
    });

  } catch (error) {
    return new Error(error);
  }
};

const deleteEvent = async (args, res) => {
  try {
    const result = await EventModel.deleteOne({ _id: args.id });
    return result.deletedCount ? true : false;
  } catch (error) {
    return new Error(error);
  }
};

export const eventMutations = {
  createEvent,
  updateEvent,
  deleteEvent,
};
