import { useState, useEffect } from "react";
import { projectsBySearch } from "../../api/project/project.queries";
import { deleteProject } from "../../api/project/project.mutations";
import "./project-table.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/format-date";

export function ProjectTable() {

    const navigate = useNavigate();

    const [queryString, setQueryString] = useState('');
    const [projects, setProjects] = useState([]);
    const [projectToDelete, setProjectToDelete] = useState();

    useEffect(() => {
        projectsBySearch(queryString).then((projectResponse) => {
            setProjects(projectResponse?.data?.projectsBySearch);
        });
    }, [queryString]);

    useEffect(() => {
        if (projectToDelete) {
            deleteProject(projectToDelete._id).then(() => {
                setProjectToDelete();
                setQueryString();
            });
        }
    }, [projectToDelete]);

    return <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    }}>

        <div>
            <input
                type="text"
                placeholder="Search"
                onChange={(event) => { setQueryString(event.target.value) }} />
        </div>

        <table className="aae-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>UpdatedAt</th>
                    <th>CreaedAt</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project, index) => <tr key={index}>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{formatDate(project.createdAt)}</td>
                    <td>{formatDate(project.updatedAt)}</td>
                    <td>
                        <button onClick={() => { navigate(`/projects/${project._id}`); }} >Update</button>
                        <button onClick={() => { setProjectToDelete(project) }} >Delete</button>
                    </td>
                </tr>)}
            </tbody>
        </table>

    </div>
}
