import { useState, useEffect } from "react";
import { createProject } from "../../api/project/project.mutations";
import "./create-project.css";
import { useNavigate } from "react-router-dom";

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

        <form className="create-project__form">

            <div className="create-project__form-input-wrapper">
                <label className="create-project__form-label" htmlFor="project-name">Project Name</label>
                <input className="create-project__form-input" type="text" name="project-name" id="project-name" value={title} onChange={(event) => { setTitle(event.target.value) }} />
            </div>

            <div className="create-project__form-input-wrapper">
                <label className="create-project__form-label" htmlFor="project-description">Project Description</label>
                <textarea className="create-project__form-textarea" onChange={(event) => { setDescription(event.target.value) }}>{description}</textarea>
            </div>

            <input className="create-project__create-button" type="button" value="Create" onClick={() => { setSaved(true) }} />

        </form>

    </div>
}
