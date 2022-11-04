import { useEffect } from "react";
import { useState } from "react"
import { processesByProject } from "../../../api/project/project.queries";
import { ProcessItem } from "./process-list/process-item";
import "./process-list/process-list.css";

export function ProcessList({ project }) {

    const [processes, setProcesses] = useState([]);

    useEffect(() => {
        if (project) {
            processesByProject(project._id).then((processesByProjectResponse) => {
                if (processesByProjectResponse?.data?.processesByProject) {
                    setProcesses(processesByProjectResponse.data.processesByProject);
                }
            });
        }
    }, [project])

    return <div className="aae-process-list">

        {processes.map((process, index) => <ProcessItem process={process} key={process._id} />)}

    </div>
}
