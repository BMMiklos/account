import { Schema, model } from "mongoose";

const safeSchema = new Schema<any>({
  // _id: Schema.Types.ObjectId,
  label: String,
  secret: String,
  hash: String,
  description: String,
  createdAt: Number,
  updatedAt: Number
});

export const SafeModel = model("safe", safeSchema);
