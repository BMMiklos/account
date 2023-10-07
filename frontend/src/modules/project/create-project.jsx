import { useState, useEffect } from "react";
import { createProject } from "../../api/project/project.mutations";
import { useNavigate } from "react-router-dom";
import "./create-project.css";

export function CreateProject() {

    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const [isSaved, setSaved] = useState(false);

    useEffect(() => {
        if (isSaved) {
            createProject({ title, description }).then((createProjectResponse) => {
                if (createProjectResponse?.data?.createProject) {
                    navigate("/projects");
                }
            });
        }
        setSaved(false);
    }, [isSaved]);

    return <div className="create-project">

        <div className="create-project__form">

            <div className="create-project__form-input-wrapper">
                <label style={{ display: 'block' }} htmlFor="project-name">Project Name</label>
                <input
                    name="project-name"
                    id="project-name"
                    value={title}
                    onChange={(event) => { setTitle(event.target.value) }}
                />
            </div>

            <div className="create-project__form-input-wrapper">
                <label style={{ display: 'block' }} htmlFor="project-description">Project Description</label>
                <textarea onChange={(event) => { setDescription(event.target.value) }}>{description}</textarea>
            </div>

            <button onClick={() => { setSaved(true) }}>Create</button>

        </div>

    </div>
}
