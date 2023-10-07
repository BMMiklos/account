import { useState, useEffect } from "react";
import { createProcess } from "../../../../../../api/project/process.mutations";
import { useUpdateProjectDispatch } from "../../../../../../context/update-project.context";
import "./process-create-form.css";

export function ProcessCreateForm({ project }) {

    const updateProjectDispatch = useUpdateProjectDispatch();

    /**
     * Process creation
     */

    const [processDataToCreate, setProcessDataToCreate] = useState({
        title: null,
        description: null,
    });

    const [isSaved, setSaved] = useState(false);

    useEffect(() => {
        if (isSaved) {
            createProcess({
                ...processDataToCreate,
                project: project?._id
            }).then((createdProcessResponse) => {
                if (createdProcessResponse?.data?.createProcess) {
                    setProcessDataToCreate({ title: null, description: null });
                    updateProjectDispatch({ type: "FORGET_PROCESSES_TO_RENDER" });
                }
            });
            setSaved(false);
        }
    }, [isSaved]);

    return <div className="aae-process-create-form">

        <div className="aae-process-create-form__input-wrapper">
            <label className="aae-process-create-form__label">Title</label>
            <input
                className="aae-process-create-form__input"
                type="text"
                value={processDataToCreate.title}
                onChange={(event) => {
                    setProcessDataToCreate((processData) => ({ ...processData, title: event.target.value }))
                }} />
        </div>

        <div className="aae-process-create-form__input-wrapper">
            <label className="aae-process-create-form__label">Description</label>
            <textarea
                className="aae-process-create-form__input"
                type="textarea"
                rows="4"
                value={processDataToCreate.descrition}
                onChange={(event) => {
                    setProcessDataToCreate((processData) => ({ ...processData, description: event.target.value }))
                }} />
        </div>
        <button className="aae-process-create-form__create-button" onClick={() => { setSaved(true) }}>Create</button>
    </div>
}