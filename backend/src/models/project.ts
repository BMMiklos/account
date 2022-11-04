import { Schema, model, Types } from "mongoose";

const projectSchema = new Schema<any>({
  // _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  processes: [{ type: Schema.Types.ObjectId, ref: 'process' }],
  entries: [{ type: Schema.Types.ObjectId, ref: 'entry' }],
  createdAt: Number,
  updatedAt: Number
});

const ProjectModel = model("project", projectSchema);

const projectProcessSchema = new Schema<any>({
  // _id: Types.ObjectId,
  title: { type: String, required: false },
  description: { type: String, required: false },
  project: { type: Schema.Types.ObjectId, ref: 'project' },
  entries: [{ type: Schema.Types.ObjectId, ref: 'entry' }],
  createdAt: Number,
  updatedAt: Number
});

const ProjectProcessModel = model("process", projectProcessSchema);

const projectEntrySchema =  new Schema<any>({
  // _id: Types.ObjectId,
  title: { type: String, required: false },
  description: { type: String, required: false },
  note: { type: String, required: false },
  project: { type: Schema.Types.ObjectId, ref: 'project' },
  createdAt: Number,
  updatedAt: Number
});

const ProjectEntryModel = model("entry", projectEntrySchema);

export { ProjectModel, ProjectProcessModel as ProjectProcessModel, ProjectEntryModel };
