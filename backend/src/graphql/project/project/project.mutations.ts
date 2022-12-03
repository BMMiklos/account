import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull } from "graphql";
import {
  ProjectProcessModel,
  ProjectEntryModel,
  ProjectModel,
} from "../../../models/project";

const createProject = async (args, res) => {
  try {
    let project = new ProjectModel({
      title: args.data.title,
      description: args.data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    let result = await project.save();
    return result;
  } catch (error) {
    return new Error(error);
  }
};

const updateProject = async (args, res) => {
  try {
    await ProjectModel.findById(args.id)
      .populate({ path: "processes" })
      .then(async (project) => {
        if (!project) {
          throw `No project is exsits with the given id ${args.id}!`;
        }
      });

    return await ProjectModel.findByIdAndUpdate(args.id, {
      ...args.data,
    })
      .populate({ path: "processes" })
      .populate({ path: "entries" });
  } catch (error) {
    return new Error(error);
  }
};

const deleteProject = async (args, res) => {
  try {
    let projectById = await ProjectModel.findById(args.id);

    if (projectById) {
      await ProjectProcessModel.deleteMany({ project: args.id });
      await ProjectEntryModel.deleteMany({ project: args.id });
    } else {
      throw `There is no project with the given id ${args.id}!`;
    }

    let result = await ProjectModel.deleteOne({ _id: args.id });
    return result.deletedCount ? true : false;
  } catch (error) {
    return new Error(error);
  }
};

const projectMutations = {
  createProject,
  updateProject,
  deleteProject
};

export default projectMutations;
