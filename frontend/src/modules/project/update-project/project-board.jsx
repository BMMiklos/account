import { useState, useEffect, useMemo } from "react";
import { moveProcess } from "../../../api/project/process.mutations";
import { processesByProject } from "../../../api/project/process.queries";
import { useUpdateProjectState, useUpdateProjectDispatch } from "../../../context/update-project.context";
import { ProcessCard } from "./project-board/process-card/process-card";
import { ProcessCreate } from "./project-board/process-create/process-create";
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
                    updateProjectDispatch({ type: "SET_PROCESSES_TO_RENDER", payload: processes.data.processesByProject })
                }
            });
        }
    }, [project, updateProjectState]);

    /**
     * Move process
     */

    const executeMoveProcess = () => {
        if (updateProjectState?.processDragAndDropSettings?.process && !updateProjectState?.entryDragAndDropSettings?.entry) {
            moveProcess({
                project: project?._id,
                process: updateProjectState?.processDragAndDropSettings?.process?._id,
                index: updateProjectState?.processDragAndDropSettings?.index
            }).then(() => {
                updateProjectDispatch({ type: "FORGET_ENTRY_MOVE_SETTINGS" });
                updateProjectDispatch({ type: "FORGET_PROCESSES_TO_RENDER" });
            })
        }
    };

    return <div className="aae-project-board">

        <div className="aae-project-board__processes">

            <div className="aae-project-board__process-create">
                <ProcessCreate project={project} />
            </div>

            {processes?.map((process, index) =>
                <div
                    className="aae-project-board__process-wrapper"
                    onDragEnter={(event) => { updateProjectDispatch({ type: "SET_PROCESS_MOVE_SETTINGS", payload: { index } }) }}
                    onDragEnd={() => { executeMoveProcess() }}
                    key={`${process._id}-${index}`}>
                    <ProcessCard process={process} />
                </div>
            )}
        </div>

    </div>
}
