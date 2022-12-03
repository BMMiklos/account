import {
  ProjectProcessModel,
  ProjectEntryModel,
  ProjectModel,
} from "../../../models/project";

const createEntry = async (args, res) => {
  try {
    let entry;

    let projectById = await ProjectModel.findOne({
      _id: args.data.project,
    });

    if (projectById) {
      if (args.data.process) {
        await ProjectProcessModel.findOne({
          _id: args.data.process,
          project: [args.data.project],
        }).then(async (processById) => {
          if (processById) {
            entry = await ProjectEntryModel.create({
              project: projectById._id,
              title: args.data.title,
              description: args.data.description,
            });

            await ProjectProcessModel.updateOne(
              {
                _id: args.data.process,
              },
              {
                $push: { entries: entry._id },
              }
            );
          } else {
            throw `Process with this id ${args.data.process} isn't exsists, or the process is not joined to the project!`;
          }
        });
      } else {
        entry = await ProjectEntryModel.create({
          project: projectById._id,
          title: args.data.title,
          description: args.data.description,
        });
      }
    } else {
      throw `Project with this id ${args.data.project} isn't exsists!`;
    }

    if (entry) {
      await ProjectModel.updateOne(
        {
          _id: args.data.project,
        },
        {
          $push: { entries: entry._id },
        }
      );
    }

    return entry;
  } catch (error) {
    return new Error(error);
  }
};

const updateEntry = async (args, res) => {
  try {
    return await ProjectEntryModel.findByIdAndUpdate(
      args.id,
      args.data
    ).populate({
      path: "project",
    });
  } catch (error) {
    return new Error(error);
  }
};

const deleteEntry = async (args, res) => {
  try {
    await ProjectModel.updateMany(
      { entries: args.id },
      { $pull: { entries: args.id } }
    );
    await ProjectProcessModel.updateMany(
      { entries: args.id },
      { $pull: { entries: args.id } }
    );
    let result = await ProjectEntryModel.deleteOne({
      _id: args.id,
    });
    return result.deletedCount ? true : false;
  } catch (error) {
    return new Error(error);
  }
};

const setEntryToProcess = async (
  { entry: entryId, process: processId },
  res
) => {
  try {
    let result = false;

    await ProjectModel.findOne({
      entries: entryId,
      processes: processId,
    }).then(async (project) => {
      if (project) {
        await ProjectProcessModel.findOne({
          _id: processId,
          entries: entryId,
        }).then(async (process) => {
          if (process) {
            result = false;
          } else {
            await ProjectEntryModel.findById(entryId).then(async (entry) => {
              if (entry) {
                let updateResult = await ProjectProcessModel.updateMany(
                  { _id: processId },
                  {
                    $push: { entries: entryId },
                  }
                );

                result = updateResult.modifiedCount ? true : false;
              } else {
                throw `There is no entry with the given id ${entryId}`;
              }
            });
          }
        });
      } else {
        throw `The given process and entity are not in the same project!`;
      }
    });

    return result;
  } catch (error) {
    return new Error(error);
  }
};

const removeEntryFromProcess = async (args, res) => {
  try {
    let result = await ProjectProcessModel.updateMany(
      {
        _id: args.process,
      },
      {
        $pull: { entries: args.entry },
      }
    );

    return result.modifiedCount ? true : false;
  } catch (error) {
    return new Error(error);
  }
};

const moveProcess = async (
  { project: projectId, process: processId, index: processIndex },
  res
) => {
  try {
    await ProjectModel.findById(projectId).then(async (project) => {
      if (project) {
        let process = await ProjectProcessModel.findById(processId);
        if (!process) {
          throw `The process cannot be found with the given id ${processId}!`;
        }

        let processes = [...project.processes];
        const processIsJoinedToProject = processes.some(
          (processInProject) => processInProject._id == processId
        );
        if (processIsJoinedToProject) {
          let actualProcessIndex = processes.findIndex(
            (processInProject) => processInProject._id == processId
          );

          processes.splice(actualProcessIndex, 1);
          processes.splice(processIndex, 0, processId);

          await ProjectModel.updateMany(
            {
              _id: projectId,
            },
            {
              processes: processes,
            }
          );
        } else {
          throw `The process is not joined to the project ${projectId}!`;
        }
      } else {
        throw `There is no project with the given id ${projectId}`;
      }

      return true;
    });
  } catch (error) {
    return new Error(error);
  }
};

const moveEntry = async (
  { project: projectId, process: processId, entry: entryId, index: entryIndex },
  res
) => {
  try {
    await ProjectModel.findById(projectId).then(async (project) => {
      if (project) {
        await ProjectEntryModel.findById(entryId).then(async (entry) => {
          if (entry) {
            const entryActualProcess = await ProjectProcessModel.findOne({
              entries: entryId,
            });

            if (processId) {
              // If there is process id given that means, i have to remove the entry from the old one, and join to the new one

              const newEntryProcess = await ProjectProcessModel.findOne({
                _id: processId,
              });

              if (newEntryProcess.project != entry.project) {
                throw `The two entities are not in the same project!`;
              }

              if (newEntryProcess) {
                // if the entry weren't connected to any processes
                if (entryActualProcess) {
                  await ProjectProcessModel.updateOne(
                    {
                      _id: entryActualProcess._id,
                    },
                    {
                      $pull: {
                        entries: entryId,
                      },
                    }
                  );
                }

                let newProcessEntries = [...newEntryProcess.entries];
                newProcessEntries.splice(newProcessEntries.length, 0, entryId);

                await ProjectProcessModel.updateOne(
                  {
                    _id: newEntryProcess._id,
                  },
                  {
                    entries: newProcessEntries,
                  }
                );
              } else {
                throw `There is no process with the given id ${processId}!`;
              }
            } else {
              // If there is no process id given, it means that only a sort is goning to happen in the process
              if (entryActualProcess) {
                let actualEntryArray = [...entryActualProcess.entries];
                let actualEntryIndex = actualEntryArray.findIndex(
                  (actualEntryArrayId) => actualEntryArrayId == entryId
                );

                actualEntryArray.splice(actualEntryIndex, 1);
                actualEntryArray.splice(entryIndex, 0, entryIndex);

                await ProjectProcessModel.updateOne(
                  {
                    _id: entryActualProcess._id,
                  },
                  {
                    entries: actualEntryArray,
                  }
                );
              }
            }
          } else {
            throw `There is no entry with the given id ${entryId}!`;
          }
        });
      } else {
        throw `There is no project with the given id ${projectId}`;
      }
    });
  } catch (error) {
    return new Error(error);
  }
};

const entryMutations = {
  createEntry: createEntry,
  deleteEnty: deleteEntry,
  updateEntry: updateEntry,
  setEntryToProcess: setEntryToProcess,
  removeEntryFromProcess: removeEntryFromProcess,
  moveProcess: moveProcess,
  moveEntry: moveEntry,
};

export default entryMutations;
