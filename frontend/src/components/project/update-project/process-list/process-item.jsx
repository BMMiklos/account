import { useEffect } from "react";
import { useState } from "react";
import { createEntry } from "../../../../api/project/project.mutations";
import { deleteProcess, updateProcess } from "../../../../api/project/process.mutations";
import { EntryList } from "./entry-list-item/entry-list";
import "./process-item.css";

export function ProcessItem({ process }) {

    const [isEntriesVisible, setEntriesVisible] = useState(false);
    const [isInEditMode, setEditMode] = useState(false);

    const [title, setTitle] = useState(process.title);
    const [description, setDescription] = useState(process.description);

    const [isSaved, setSaved] = useState(false);

    useEffect(() => {
        if (isSaved) {
            updateProcess(process._id, {
                title,
                description
            });
            setSaved(false);
            setEditMode(false);
        }
    }, [isSaved]);

    /**
     * Delete process
     */

    const [processToDelete, setProcessToDelete] = useState();

    useEffect(() => {
        if (processToDelete) {
            deleteProcess(processToDelete._id).then((deleteProcessResponse) => {
                if (deleteProcessResponse?.data?.deleteProcess) {
                    setProcessToDelete(null);
                }
            });
        }
    }, [processToDelete]);

    /**
     * Create entry
     */

    const [isEntryCreateFormVisible, setEntryCreateFormVisible] = useState(false);

    const [isCreatedEntrySaved, setCreatedEntrySaved] = useState(false);

    const [entryToCreate, setEntryToCreate] = useState({
        project: null,
        process: null,
        title: null,
        description: null
    });

    useEffect(() => {
        if (isCreatedEntrySaved) {
            createEntry({
                ...entryToCreate,
                project: process.project._id,
                process: process._id,
            });
            setCreatedEntrySaved(false);
        }
    }, [isCreatedEntrySaved]);

    return <div className="aae-process-item">

        <div className="aae-process-item__head">
            <div className="aae-process-item__heading">

                {!isInEditMode && <>
                    <h4 className="aae-process-item__title">
                        {title}
                    </h4>
                    <h5 className="aae-process-item__description">
                        {description} {process._id}
                    </h5>
                </>}

                {isInEditMode && <>
                    <input value={title} onChange={(event) => { setTitle(event.target.value) }} type="text" />
                    <input value={description} onChange={(event) => { setDescription(event.target.value) }} type="text" />
                </>}

            </div>
            <div className="aae-process-item__events">

                {!isInEditMode && <button onClick={() => { setEditMode(true) }}>Update</button>}

                {isInEditMode && <button onClick={() => {
                    setSaved(true)
                }}>Save</button>}

                {isInEditMode && <button onClick={() => {
                    setEditMode(false);
                    setTitle(process.title);
                    setDescription(process.description);
                }}>Cancel</button>}

                <button onClick={() => { setProcessToDelete(process) }}>Delete</button>

            </div>
        </div>

        {/* Entry operations - // todo - refactory this component */}

        <div className="aae-process-item__entry-events">
            <button onClick={() => { setEntriesVisible(!isEntriesVisible) }}>Show</button>
            <button onClick={() => { setEntryCreateFormVisible(true) }}>New Entry</button>
        </div>

        {isEntryCreateFormVisible && <div className="aae-process-item__new-entry">

            <label>Title</label>

            <input
                type="text"
                value={entryToCreate?.title}
                onChange={(event) => {
                    setEntryToCreate((entry) => ({ ...entry, title: event.target.value }))
                }}
            />

            <label>Description</label>

            <input
                type="text"
                value={entryToCreate?.description}
                onChange={(event) => {
                    setEntryToCreate((entry) => ({ ...entry, description: event.target.value }))
                }} />

            <button onClick={() => { setCreatedEntrySaved(true) }}>Save</button>

        </div>}

        {isEntriesVisible && <EntryList entries={process.entries} />}

    </div>
}
