import { createHash } from 'crypto';
import { SafeModel } from "../../models/safe";

const safes = async (args, res) => {
    try {

        let safes = await SafeModel.find({
            $or: [
                { label: { $regex: args?.safeFilter?.label, $options: "i" } },
                { description: { $regex: args?.safeFilter?.description, $options: "i" } },
            ]
        });

        return safes.map(safe => {
            safe.secret = null;
            return safe;
        });

    } catch (error) {
        return new Error(error);
    }
};

const safeById = async (args, res) => {
    try {

        let safe = await SafeModel.findById(args.id);

        if (safe) {

            if (safe?.hash) {
                if (args?.password) {
                    let passwordHash = createHash('sha256').update(args.password).digest('hex');
                    if (passwordHash != safe.hash) {
                        throw "The password is incorrect!";
                    }
                } else {
                    safe.secret = null;
                }
            }
    
            return safe;

        } else {
            throw "There is no safe with the given id!";
        }

    } catch (error) {
        return new Error(error);
    }
};

export const safeQueries = {
    safes,
    safeById
};
