import { useState, useEffect } from "react";
import { moveEntry } from "../../../../../api/project/entry.mutations";
import { deleteProcess } from "../../../../../api/project/process.mutations";
import { useUpdateProjectState, useUpdateProjectDispatch } from "../../../../../context/update-project.context";
import { EntryBoardItem } from "./entry-board-item/entry-board-item";
import { EntryCreateForm } from "./entry-create-form/entry-create-form";
import "./process-board-card.css";

export function ProcessBoardCard({ process }) {

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
                    updateProjectDispatch({ type: "DELETE_SELECTED_PROJECT" });
                }
            });
        }
    }, [processToDelete]);

    /**
     * Move entry with drag and drop
     */

    const [entryDataToMove, setEntryDataToMove] = useState();
    const [entryDataIndex, setEntryDataIndex] = useState(0);
    const [isMouseReleased, setMouseReleased] = useState(false);

    // Execute the drag and drop changes, if the user releases the mouse

    // useEffect(() => {
    //     if (isMouseReleased && entryDataToMove) {
    //         moveEntry(entryDataToMove).then((data) => {
    //             setEntryDataToMove();
    //             updateProjectDispatch({ type: "DELETE_SELECTED_PROJECT" });
    //             setMouseReleased(false);
    //         });
    //     }
    // }, [isMouseReleased]);

    return <div

        onDragEnter={() => {
            setEntryDataToMove({
                project: process?.project?._id,
                process: process?._id,
                index: entryDataIndex,
                entry: updateProjectState?.entry?._id
            });
        }}

        onDragEnd={() => {
            setMouseReleased(true);
        }}

        className="aae-process-card">

        <div className="aae-process-card__settings">
            <h3 className="aae-process-card__title">{process.title}</h3>
            <button onClick={() => { setProcessToDelete(process) }} className="aae-process-card__delete-button">Delete</button>
        </div>

        {entries?.map((entry, index) => <div
            key={`${entry._id}-${index}`}
            onDragEnter={() => { setEntryDataIndex(index + 1) }}
            className="aae-process-card__entry">
            <EntryBoardItem entry={entry} />
        </div>)}

        <div className="aae-process-card__entry">
            <EntryCreateForm process={process} />
        </div>

    </div>
}
