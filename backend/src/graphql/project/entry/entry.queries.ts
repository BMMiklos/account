import {
    ProjectProcessModel,
    ProjectEntryModel
} from "../../../models/project";

const entryById = async (args, res) => {
    try {
        let entryById = await ProjectEntryModel.findById(args.id).populate({
            path: "project",
        });
        return entryById;
    } catch (error) {
        return new Error(error);
    }
};

const entriesByProcess = async (args, res) => {
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
};

const entryQueries = {
    entriesByProcess,
    entryById,
};

export default entryQueries;
