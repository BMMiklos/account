import { useState } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { projectById } from "../../api/project/project.queries";
import { ProcessList } from "./update-project/process-list";
import { ProjectBoard } from "./update-project/project-board";
import "./update-project/update-project.css";

export function UpdateProject() {

    const params = useParams();
    const [project, setProject] = useState();
    const [viewType, setViewType] = useState("board");

    useEffect(() => {
        if (params.id) {
            projectById(params.id).then((projectResponse) => {
                setProject(projectResponse?.data?.projectById);
            });
        }
    }, [params]);

    return <div className="aae-update-project">

        <div>
            <h2>{project?.title}</h2>
            <h3>{project?.description} {project?._id}</h3>
            <div>
                <button disabled={viewType == "board"} onClick={() => { setViewType("board") }}>Board</button>
                <button disabled={viewType == "list"} onClick={() => { setViewType("list") }}>List</button>
            </div>
        </div>

        {viewType == "list" && <div>
            <ProcessList project={project} />
        </div>}

        {viewType == "board" && <div>
            <ProjectBoard project={project} />
        </div>}

    </div>
}
