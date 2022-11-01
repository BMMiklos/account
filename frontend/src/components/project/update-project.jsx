import { useState } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { projectById } from "../../api/project/project.queries";
import { ProcessList } from "./update-project/process-list";
import { ProjectBoard } from "./update-project/project-board";

export function UpdateProject() {

    const params = useParams();
    const [project, setProject] = useState();

    useEffect(() => {
        if (params.id) {
            projectById(params.id).then((projectResponse) => {
                setProject(projectResponse?.data?.projectById);
            });
        }
    }, [params]);

    return <div>

        <div>
            <h2>{project?.title}</h2>
            <h3>{project?.description}</h3>
        </div>

        <div>
            <ProcessList project={project} />
        </div>

        <div>
            <ProjectBoard project={project} />
        </div>

    </div>
}
