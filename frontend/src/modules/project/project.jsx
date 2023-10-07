import { useState, useEffect } from "react";
import { projectsBySearch } from "../../api/project/project.queries";
import { deleteProject } from "../../api/project/project.mutations";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/format-date";
import "./project.css";

export function Project() {

    const navigate = useNavigate();

    const [queryString, setQueryString] = useState('');
    const [projects, setProjects] = useState([]);
    const [projectToDelete, setProjectToDelete] = useState();

    useEffect(() => {
        projectsBySearch(queryString).then((projectResponse) => {
            setProjects(projectResponse?.data?.projectsBySearch);
        });
    }, [queryString, projectToDelete]);

    useEffect(() => {
        if (projectToDelete) {
            deleteProject(projectToDelete._id).then(() => {
                setProjectToDelete();
                setQueryString('');
            });
        }
    }, [projectToDelete]);

    return <div className="aae-project">

        <div className="aae-project__header">
            <h3 className="aae-project__title">
                # Projects
            </h3>

            <input placeholder="Search"
                value={queryString}
                onChange={(event) => { setQueryString(event.target.value) }}
            />

            <button onClick={() => { setQueryString("") }}>x</button>

        </div>

        <div className="aae-project-grid">

            <div className="aae-project-grid_row aae-project-grid_row--head">
                <div>Name</div>
                <div>Description</div>
                <div>UpdatedAt</div>
                <div>CreatedAt</div>
                <div>Operations</div>
            </div>

            {projects.map((project, index) => <div key={index} className="aae-project-grid_row">
                <div>{project.title}</div>
                <div>{project.description}</div>
                <div>{formatDate(project.createdAt)}</div>
                <div>{formatDate(project.updatedAt)}</div>
                <div>
                    <button onClick={() => { navigate(`/projects/${project._id}`) }}>Update</button>
                    <button onClick={() => { setProjectToDelete(project) }}>Delete</button>
                </div>
            </div>)}

        </div>


    </div>
}
