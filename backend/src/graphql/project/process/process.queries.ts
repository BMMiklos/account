import { ProjectModel, ProjectProcessModel } from "../../../models/project";

const processById = async (args, res) => {
  try {
    let result = await ProjectProcessModel.findById(args.id)
      .populate({ path: "project" })
      .populate({ path: "entries" });
    return result;
  } catch (error) {
    return new Error(error);
  }
};

const processesByProject = async (args, res) => {
  try {
    let processes = await ProjectModel.findById(args.project).then(
      async (projectById) => {
        if (projectById) {
          let processesFromProject = await ProjectProcessModel.find({
            _id: projectById.processes,
          }).populate({ path: "entries" });

          let sortedProcessesFromProject = projectById.processes.map(
            (processBeforePopulation) => {
              return processesFromProject.find((process) =>
                processBeforePopulation.equals(process._id)
              );
            }
          );

          return sortedProcessesFromProject;
        } else {
          throw "The project cannot be found by the given id!";
        }
      }
    );

    return processes;
  } catch (error) {
    return new Error(error);
  }
};

const processQueries = {
  processById,
  processesByProject,
};

export default processQueries;
