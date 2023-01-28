import { createHash } from 'crypto';
import { SafeModel } from "../../models/safe";

const createSafe = async (args, res) => {
    try {

        if (args.data?.password) {
            let passwordHash = createHash('sha256').update(args.data.password).digest('hex');
            args.data.hash = passwordHash;
        }

        return await SafeModel.create(args.data);

    } catch (error) {
        return new Error(error);
    }
};

const updateSafe = async (args, res) => {
    try {

        const safe = await SafeModel.findById(args.id);

        if (safe) {

            // Password checking
            if (safe?.hash) {
                if (args?.password) {
                    let passwordHash = createHash('sha256').update(args.password).digest('hex');
                    if (passwordHash != safe.hash) {
                        throw "The password is incorrect!";
                    }
                } else {
                    throw "There is no password given!";
                }
            }

            // New password hash generation
            if (args.data?.password) {
                let newPasswordHash = createHash('sha256').update(args.data.password).digest('hex');
                args.data.hash = newPasswordHash;
            }

            return await SafeModel.findByIdAndUpdate(args.id, args.data, { lean: true });

        } else {
            throw "There is no safe with the given id!";
        }

    } catch (error) {
        return new Error(error);
    }
};

const deleteSafe = async (args, res) => {
    try {

        const safe = await SafeModel.findById(args.id);

        // Password checking
        if (safe?.hash) {
            if (args?.password) {
                let passwordHash = createHash('sha256').update(args.password).digest('hex');
                if (passwordHash != safe.hash) {
                    throw "The password is incorrect!";
                }
            } else {
                throw "There is no password given!";
            }
        }

        if (await SafeModel.findByIdAndDelete(args.id)) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return new Error(error);
    }
};

export const safeMutations = {
    createSafe,
    updateSafe,
    deleteSafe
};
