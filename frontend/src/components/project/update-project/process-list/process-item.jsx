import { useEffect } from "react";
import { useState } from "react";
import { updateProcess } from "../../../../api/project/project.mutations";
import { EntryList } from "./entry-list-item/entry-list";
import "./process-item.css";

export function ProcessItem({ process }) {

    const [isDetailsVisible, setDetailsVisible] = useState(false);
    const [isInEditMode, setEditMode] = useState(false);
    const [isEntryCreateFormVisible, setEntryCreateFormVisible] = useState(false);

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


                {/* <button onClick={() => { setEntryCreateFormVisible(!isEntryCreateFormVisible) }}>New</button>
                <button onClick={() => { }}>Delete</button> */}
            </div>
        </div>

        <div className="aae-process-item__entry-events">
            <button onClick={() => { setDetailsVisible(!isDetailsVisible) }}>Show</button>
        </div>

        {isDetailsVisible && <EntryList entries={process.entries} />}

    </div>
}
