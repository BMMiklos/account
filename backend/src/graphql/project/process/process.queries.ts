import {
  GraphQLFieldConfig,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import {
  ProjectModel,
  ProjectProcessModel,
  ProjectEntryModel,
} from "../../../models/project";
import { ProcessType, EntryType, ProjectType } from "../project.type";

const processById = {
  type: ProcessType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    try {
      let result = await ProjectProcessModel.findById(id)
        .populate({ path: "project" })
        .populate({ path: "entries" });
      return result;
    } catch (error) {
      return new Error(error);
    }
  },
};

const processesByProject = {
  type: new GraphQLList(ProcessType),
  args: {
    project: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { project }) => {
    try {

      let processes = await ProjectModel.findById(project).then(async (projectById) => {
        if (projectById) {
          return await ProjectProcessModel.find({
            _id: projectById.processes
          }).populate({ path: "entries" });
        } else {
          throw "The project cannot be found by the given id!";
        }
      });

      return processes;
    } catch (error) {
      return new Error(error);
    }
  },
};

const processQueries = {
  processById,
  processesByProject,
};

export default processQueries;
