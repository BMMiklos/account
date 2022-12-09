import { useState, useEffect } from "react";
import { deleteProcess } from "../../../../../api/project/process.mutations";
import { useUpdateProjectDispatch } from "../../../../../context/update-project.context";
import { EntryBoardItem } from "./entry-board-item/entry-board-item";
import { EntryCreateForm } from "./entry-create-form/entry-create-form";
import "./process-board-card.css";

export function ProcessBoardCard({ process }) {

    const updateProjectDispatch = useUpdateProjectDispatch();

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

    return <div className="aae-process-card">

        <div className="aae-process-card__settings">
            <h3 className="aae-process-card__title">{process.title}</h3>
            <button onClick={() => { setProcessToDelete(process) }} className="aae-process-card__delete-button">Delete</button>
        </div>

        {entries?.map((entry, index) => <div key={`${entry._id}-${index}`} className="aae-process-card__entry">
            <EntryBoardItem entry={entry} />
        </div>)}

        <div className="aae-process-card__entry">
            <EntryCreateForm process={process}/>
        </div>

    </div>
}
