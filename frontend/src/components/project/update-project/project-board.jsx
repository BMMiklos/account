import { useState, useEffect } from "react";
import { processesByProject } from "../../../api/project/process.queries";
import { useUpdateProjectDispatch, useUpdateProjectState } from "../../../context/update-project.context";
import { ProcessBoardCard } from "./project-board/process-board-card/process-board-card";
import { ProjectBoardProcessCreate } from "./project-board/project-board-process-create/project-board-process-create";
import "./project-board/project-board.css";

export function ProjectBoard({ project }) {

    const updateProjectState = useUpdateProjectState();
    const updateProjectDispatch = useUpdateProjectDispatch();

    const [processes, setProcesses] = useState([]);

    useEffect(() => {
        if (!updateProjectState?.selectedProcesses && project) {
            processesByProject(project._id).then((processes) => {
                if (processes?.data?.processesByProject) {
                    setProcesses(processes.data.processesByProject);
                    updateProjectDispatch({ type: "SET_SELECTED_PROCESSES", payload: processes.data.processesByProject });
                }
            });
        }
    }, [project, updateProjectState]);

    return <div className="aae-project-board">

        <div className="aae-project-board__processes">

            <div className="aae-project-board__process-create">
                <ProjectBoardProcessCreate project={project} />
            </div>

            {processes?.map((process, index) =>
                <div className="aae-project-board__process-wrapper" key={`${process._id}-${index}`}>
                    <ProcessBoardCard process={process} />
                </div>
            )}
        </div>

    </div>
}
