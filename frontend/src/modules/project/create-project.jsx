import { useState, useEffect } from "react";
import { createProject } from "../../api/project/project.mutations";
import "./create-project.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../collection/button/button";
import { Input } from "../collection/input/input";
import { Label } from "../collection/label/label";
import { Textarea } from "../collection/textarea/textarea";

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
                <Label style={{ display: 'block' }} htmlFor="project-name">Project Name</Label>
                <Input
                    name="project-name"
                    id="project-name"
                    value={title}
                    onChange={(event) => { setTitle(event.target.value) }}
                />
            </div>

            <div className="create-project__form-input-wrapper">
                <Label style={{ display: 'block' }} htmlFor="project-description">Project Description</Label>
                <Textarea onChange={(event) => { setDescription(event.target.value) }}>{description}</Textarea>
            </div>

            <Button onClick={() => { setSaved(true) }}>Create</Button>

        </form>

    </div>
}
