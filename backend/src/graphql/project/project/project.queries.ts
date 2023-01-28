import {
  ProjectModel,
} from "../../../models/project";

const projects = async (args, res) => {
  try {
    let result = await ProjectModel.find({})
      .populate({ path: "processes" })
      .populate({ path: "entries" });
    return result;
  } catch (error) {
    return new Error(error);
  }
};

const projectsBySearch = async (args, res) => {
  try {
    let result = await ProjectModel.find({
      $or: [
        { title: { $regex: args.searchQuery, $options: "i" } },
        { description: { $regex: args.searchQuery, $options: "i" } },
      ],
    })
      .populate({ path: "processes" })
      .populate({ path: "entries" });
    return result;
  } catch (error) {
    return new Error(error);
  }
};

const projectById = async (args, res) => {
  try {
    let result = await ProjectModel.findById(args.id)
      .populate({ path: "processes" })
      .populate({ path: "entries" });
    return result;
  } catch (error) {
    return new Error(error);
  }
};

const projectQueries = {
  projects,
  projectsBySearch,
  projectById,
};

export default projectQueries;
