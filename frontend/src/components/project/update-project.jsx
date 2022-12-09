import { useState } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { projectById } from "../../api/project/project.queries";
import { useUpdateProjectState, useUpdateProjectDispatch } from "../../context/update-project.context";
import { ProcessList } from "./update-project/process-list";
import { ProjectBoard } from "./update-project/project-board";
import "./update-project/update-project.css";

export function UpdateProject() {

    const params = useParams();
    const [viewType, setViewType] = useState("board");

    const [project, setProject] = useState();

    const updateProjectState = useUpdateProjectState();
    const updateProjectDispatch = useUpdateProjectDispatch();

    useEffect(() => {
        if (!updateProjectState?.project && params.id) {
            projectById(params.id).then((projectResponse) => {
                setProject(projectResponse?.data?.projectById);
                updateProjectDispatch({ type: "SET_SELECTED_PROJECT", payload: projectResponse?.data?.projectById });
            });
        }
    }, [params, updateProjectState]);

    return <div className="aae-update-project">

        <div className="aae-update-project__title">
            <h2>{project?.title}</h2>
            <h3>{project?.description} {project?._id}</h3>
            <div>
                <button disabled={viewType == "board"} onClick={() => { setViewType("board") }}>Board</button>
                <button disabled={viewType == "list"} onClick={() => { setViewType("list") }}>List</button>
            </div>
        </div>

        {viewType == "list" && <div className="aae-update-project__list">
            <ProcessList project={updateProjectState?.project} />
        </div>}

        {viewType == "board" && <div className="aae-update-project__board">
            <ProjectBoard project={updateProjectState?.project} />
        </div>}

    </div>
}
