import { useEffect } from "react";
import { useState } from "react"
import { processesByProject } from "../../../api/project/project.queries";
import { ProcessItem } from "./process-list/process-item";

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

    return <div>

        {processes.map((process, index) => <ProcessItem process={process} key={process._id} />)}

    </div>
}
