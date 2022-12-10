import { useState, useEffect } from "react";
import { moveEntry } from "../../../../../api/project/entry.mutations";
import { deleteProcess } from "../../../../../api/project/process.mutations";
import { useUpdateProjectState, useUpdateProjectDispatch } from "../../../../../context/update-project.context";
import { EntryBoardItem } from "./entry-board-item/entry-board-item";
import { EntryCreateForm } from "./entry-create-form/entry-create-form";
import "./process-card.css";

export function ProcessCard({ process }) {

    const updateProjectDispatch = useUpdateProjectDispatch();
    const updateProjectState = useUpdateProjectState();

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        if (process) {
            setEntries(process.entries);
        }
    }, [process]);

    /**
     * Delete process
     */

    const [processToDelete, setProcessToDelete] = useState();

    useEffect(() => {
        if (processToDelete) {
            deleteProcess(processToDelete._id).then((deleteProcessResponse) => {
                if (deleteProcessResponse?.data?.deleteProcess) {
                    setProcessToDelete(null);
                    updateProjectDispatch({ type: "FORGET_SELECTED_PROJECT" });
                }
            });
        }
    }, [processToDelete]);

    /**
     * Move entry with drag and drop
     */

    const executeMoveEntry = () => {
        if (updateProjectState?.entryDragAndDropSettings) {
            moveEntry({
                project: process?.project?._id,
                process: updateProjectState?.entryDragAndDropSettings?.process?._id,
                entry: updateProjectState?.entryDragAndDropSettings?.entry?._id,
                index: updateProjectState?.entryDragAndDropSettings?.index,
            }).then(() => {
                updateProjectDispatch({ type: "FORGET_SELECTED_PROJECT" }); // todo - do not update the whole object
            })
        }
    };

    return <div

        onDragEnter={() => { 
            updateProjectDispatch({ type: "SET_ENTRY_MOVE_SETTINGS", payload: { process: process } })
        }}

        onDragEnd={() => {
            executeMoveEntry();
        }}

        className="aae-process-card">

        <div className="aae-process-card__settings">
            <h3 className="aae-process-card__title">{process.title}</h3>
            <button onClick={() => { setProcessToDelete(process) }} className="aae-process-card__delete-button">Delete</button>
        </div>

        {entries?.map((entry, index) => <div
            key={`${entry._id}-${index}`}
            onDragEnter={() => { 
                updateProjectDispatch({ type: "SET_ENTRY_MOVE_SETTINGS", payload: { index: index + 1 } })
            }}
            className="aae-process-card__entry">
            <EntryBoardItem entry={entry} />
        </div>)}

        <div className="aae-process-card__entry">
            <EntryCreateForm process={process} />
        </div>

    </div>
}
