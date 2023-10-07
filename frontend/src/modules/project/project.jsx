import { useState, useEffect } from "react";
import { projectsBySearch } from "../../api/project/project.queries";
import { deleteProject } from "../../api/project/project.mutations";
import "./project.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/format-date";
import { Input } from "../collection/input/input";
import { Button } from "../collection/button/button";

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

    return <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    }}>

        <div className="aae-project-table__header">
            <h3 className="aae-project-table__title">
                # Projects
            </h3>

            <Input placeholder="Search"
                value={queryString}
                onChange={(event) => { setQueryString(event.target.value) }}
            />

            <Button onClick={() => { setQueryString("") }}>x</Button>

        </div>

        <table className="aae-project-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>UpdatedAt</th>
                    <th>CreatedAt</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody className="aae-project-table__body">
                {projects.map((project, index) => <tr key={index}>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{formatDate(project.createdAt)}</td>
                    <td>{formatDate(project.updatedAt)}</td>
                    <td>
                        <Button onClick={() => { navigate(`/projects/${project._id}`); }}>Update</Button>
                        <Button onClick={() => { setProjectToDelete(project) }}>Delete</Button>
                    </td>
                </tr>)}
            </tbody>
        </table>

    </div>
}
