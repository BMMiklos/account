import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull } from "graphql";
import {
  ProjectProcessModel,
  ProjectModel
} from "../../../models/project";

const createProcess = async (args, res) => {
  try {
    let process;

    let projectById = await ProjectModel.findById(args.data.project);

    if (projectById) {
      let document = new ProjectProcessModel({
        title: args.data.title,
        description: args.data.description ? args.data.description : null,
        project: args.data.project,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      process = await document.save();

      await ProjectModel.findByIdAndUpdate(projectById._id, {
        $push: { processes: process._id },
      });
    } else {
      throw `Process with this id ${args.data.process} isn't exsists!`;
    }

    return process;
  } catch (error) {
    return new Error(error);
  }
};

const updateProcess = async (args, res) => {
  try {
    await ProjectProcessModel.findById(args.id)
      .populate({
        path: "entries",
      })
      .then(async (process) => {
        if (!process) {
          throw `No process is exsits with this id ${args.id}!`;
        }
      });

    return await ProjectProcessModel.findByIdAndUpdate(args.id, {
      ...args.data,
    })
      .populate({ path: "project" })
      .populate({ path: "entries" });
  } catch (error) {
    return new Error(error);
  }
};

const deleteProcess = async (args, res) => {
  try {
    let processById = await ProjectProcessModel.findById(args.id);

    if (processById) {
      await ProjectModel.updateMany(
        {
          processes: processById._id,
        },
        {
          $pull: { processes: processById._id },
        }
      );
    } else {
      throw `The process with the given id is not found ${args.id}!`;
    }

    let result = await ProjectProcessModel.deleteOne({ _id: args.id });
    return result.deletedCount ? true : false;
  } catch (error) {
    return new Error(error);
  }
};

const processMutations = {
  createProcess: createProcess,
  updateProcess: updateProcess,
  deleteProcess: deleteProcess,
};

export default processMutations;
