import { Schema, model, Types } from "mongoose";

const projectSchema = new Schema<any>({
  // _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  columns: [{ type: Schema.Types.ObjectId, ref: 'column' }],
  entries: [{ type: Schema.Types.ObjectId, ref: 'entry' }],
  createdAt: Number,
  updatedAt: Number
});

const ProjectModel = model("project", projectSchema);

const projectColumnSchema = new Schema<any>({
  // _id: Types.ObjectId,
  order: Number,
  title: { type: String, required: false },
  description: { type: String, required: false },
  project: { type: Schema.Types.ObjectId, ref: 'project' },
  entries: [{ type: Schema.Types.ObjectId, ref: 'entry' }],
  createdAt: Number,
  updatedAt: Number
});

const ProjectColumnModel = model("column", projectColumnSchema);

const projectEntrySchema =  new Schema<any>({
  // _id: Types.ObjectId,
  order: Number,
  title: { type: String, required: false },
  description: { type: String, required: false },
  project: { type: Schema.Types.ObjectId, ref: 'project' },
  createdAt: Number,
  updatedAt: Number
});

const ProjectEntryModel = model("entry", projectEntrySchema);

export { ProjectModel, ProjectColumnModel, ProjectEntryModel };
