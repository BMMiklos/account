import { useEffect } from "react";
import { useState } from "react"
import { createProcess } from "../../../api/project/project.mutations";
import { processesByProject } from "../../../api/project/project.queries";
import { ProcessItem } from "./process-list/process-item";
import "./process-list/process-list.css";

export function ProcessList({ project }) {

    // Result object of the created process
    const [createdProcess, setCreatedProcess] = useState();

    /**
     * Process fetching by project
     */

    const [processes, setProcesses] = useState([]);

    useEffect(() => {
        if (project) {
            processesByProject(project._id).then((processesByProjectResponse) => {
                if (processesByProjectResponse?.data?.processesByProject) {
                    setProcesses(processesByProjectResponse.data.processesByProject);
                }
            });
        }
    }, [project, createdProcess]);


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
                    setCreatedProcess(createdProcessResponse?.data?.createProcess);
                    setProcessDataToCreate({ title: null, description: null });
                }
            });
            setSaved(false);
        }
    }, [isSaved]);

    return <div className="aae-process-list">

        <div className="aae-process-list__create">
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

        {processes.map((process, index) => <ProcessItem process={process} key={process._id} />)}

    </div>
}
