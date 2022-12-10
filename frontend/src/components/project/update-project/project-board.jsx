import { useState, useEffect } from "react";
import { processesByProject } from "../../../api/project/process.queries";
import { useUpdateProjectState, useUpdateProjectDispatch } from "../../../context/update-project.context";
import { ProcessCard } from "./project-board/process-card/process-card";
import { ProjectBoardProcessCreate } from "./project-board/project-board-process-create/project-board-process-create";
import "./project-board/project-board.css";


export function ProjectBoard({ project }) {

    const updateProjectState = useUpdateProjectState();
    const updateProjectDispatch = useUpdateProjectDispatch();

    const [processes, setProcesses] = useState([]);

    useEffect(() => {
        if (!updateProjectState?.processesToRender && project) {
            processesByProject(project._id).then((processes) => {
                if (processes?.data?.processesByProject) {
                    setProcesses(processes.data.processesByProject);
                    updateProjectDispatch({ type: "SET_PROCESSES_TO_RENDER", payload:  processes.data.processesByProject})
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
                    <ProcessCard process={process} />
                </div>
            )}
        </div>

    </div>
}
