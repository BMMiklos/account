import { useState, useEffect } from "react";
import { createEntry } from "../../../../../../api/project/project.mutations";
import { useUpdateProjectDispatch } from "../../../../../../context/update-project.context";
import "./entry-create-form.css";

export function EntryCreateForm({ process }) {

    const updateProjectDispatch = useUpdateProjectDispatch();

    const [isCreateFormVisible, setCreateFormVisible] = useState(false);

    /**
     * Entry creation
     */

    const [isSaved, setSaved] = useState(false);

    const [entryDataToCreate, setEntryDataToCreate] = useState({
        title: null,
        description: null
    });

    useEffect(() => {
        if (isSaved) {
            createEntry({
                ...entryDataToCreate,
                project: process?.project?._id,
                process: process?._id,
            }).then((createEntryResponse) => {
                if (createEntryResponse?.data?.createEntry) {
                    setEntryDataToCreate();
                    setSaved(false);
                    setCreateFormVisible(false);
                    updateProjectDispatch({ type: "FORGET_PROCESSES_TO_RENDER" });
                }
            });
        }
    }, [isSaved]);

    return <div className="aae-entry-create-form">

        {!isCreateFormVisible && <button onClick={() => { setCreateFormVisible(true) }} className="aae-entry-create-form__show-form">+</button>}

        {isCreateFormVisible && <div className="aae-entry-create-form__form">
            <label>Title</label>
            <input type="text" value={isCreateFormVisible.title} onChange={(event) => { setEntryDataToCreate(entryData => ({ ...entryData, title: event.target.value })) }} />
            <label>Description</label>
            <input type="text" value={isCreateFormVisible.description} onChange={(event) => { setEntryDataToCreate(entryData => ({ ...entryData, description: event.target.value })) }} />
            <button onClick={() => { setSaved(true) }}>Save</button>
            <button onClick={() => { setCreateFormVisible(false) }}>Close</button>
        </div>}

    </div>
}
