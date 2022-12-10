import { useState, useEffect } from "react";
import { createProcess } from "../../../../../../api/project/process.mutations";
import { useUpdateProjectDispatch } from "../../../../../../context/update-project.context";

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
        <label>Title</label>
        <input
            type="text"
            value={processDataToCreate.title}
            onChange={(event) => {
                setProcessDataToCreate((processData) => ({ ...processData, title: event.target.value }))
            }} />
        <label>Description</label>
        <input
            type="text"
            value={processDataToCreate.descrition}
            onChange={(event) => {
                setProcessDataToCreate((processData) => ({ ...processData, description: event.target.value }))
            }} />
        <button onClick={() => { setSaved(true) }}>Create</button>
    </div>
}