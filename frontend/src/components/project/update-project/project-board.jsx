import { useState, useEffect } from "react";
import { processesByProject } from "../../../api/project/process.queries";
import { ProcessBoardCard } from "./project-board/process-board-card/process-board-card";
import "./project-board/project-board.css";

export function ProjectBoard({ project }) {

    const [processes, setProcesses] = useState([]);

    useEffect(() => {
        if (project) {
            processesByProject(project._id).then((processes) => {
                if (processes?.data?.processesByProject) {
                    setProcesses(processes.data.processesByProject);
                }
            });
        }
    }, [project]);

    return <div className="aae-project-board">

        <div className="aae-project-board__processes">
            {processes?.map((process, index) =>
                <div className="aae-project-board__process-wrapper" key={`${process._id}-${index}`}>
                    <ProcessBoardCard process={process} />
                </div>
            )}
        </div>

    </div>
}
