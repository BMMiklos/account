import { Schema, model, Types } from "mongoose";

const eventSchema = new Schema<any>({
  // _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  isCompleted: Boolean,
  type: {
    type: String,
    enum: ["task", "event"]
  },
  from: Number,
  to: Number,
  createdAt: Number,
  updatedAt: Number
});

const EventModel = model("event", eventSchema);

export { EventModel };
