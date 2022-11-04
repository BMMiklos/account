import { useState, useEffect } from "react";
import { createProject } from "../../api/project/project.mutations";

export function CreateProject() {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const [isSaved, setSaved] = useState(false);

    useEffect(() => {
        if (isSaved) {
            createProject({ title, description })
        }
        setSaved(false);
    }, [isSaved])

    return <div>

        <form>

            <label htmlFor="project-name">Project Name</label>
            <input type="text" name="project-name" id="project-name" value={title} onChange={(event) => { setTitle(event.target.value) }} />

            <label htmlFor="project-description">Project Description</label>
            <textarea onChange={(event) => { setDescription(event.target.value) }}>{description}</textarea>

            <input type="button" value="Create" onClick={() => { setSaved(true) }} />

        </form>

    </div>
}