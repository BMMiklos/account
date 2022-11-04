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
} from "../../models/project";
import { ProcessType, EntryType, ProjectType } from "./project.type";

const projects: GraphQLFieldConfig<any, {}, any> = {
  type: new GraphQLList(ProjectType),
  resolve: async (_, {}) => {
    try {
      let result = await ProjectModel.find({})
        .populate({ path: "processes" })
        .populate({ path: "entries" });
      return result;
    } catch (error) {
      return new Error(error);
    }
  },
};

const projectsBySearch = {
  type: new GraphQLList(ProjectType),
  args: {
    searchQuery: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { searchQuery }) => {
    try {
      let result = await ProjectModel.find({
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      })
        .populate({ path: "processes" })
        .populate({ path: "entries" });
      return result;
    } catch (error) {
      return new Error(error);
    }
  },
};

const projectById = {
  type: ProjectType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    try {
      let result = await ProjectModel.findById(id)
        .populate({ path: "processes" })
        .populate({ path: "entries" });
      return result;
    } catch (error) {
      return new Error(error);
    }
  },
};

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
            _id : projectById.processes
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

const entryById = {
  type: EntryType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    try {
      let entryById = await ProjectEntryModel.findById(id).populate({
        path: "project",
      });
      return entryById;
    } catch (error) {
      return new Error(error);
    }
  },
};

const entriesByProcess = {
  type: new GraphQLList(EntryType),
  args: {
    process: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { process }) => {
    try {
      let entriesByProcess = await ProjectProcessModel.findById(
        process
      ).populate({
        path: "entries",
      });
      return entriesByProcess.entries;
    } catch (error) {
      return new Error(error);
    }
  },
};

const projectQueries = {
  projects,
  projectsBySearch,
  projectById,
  processById,
  processesByProject,
  entriesByProcess,
  entryById,
};

export default projectQueries;
