import { useEffect } from "react";
import { useState } from "react";
import { projectsBySearch } from "../../api/project/project.queries";
import "./project-table.css";

export function ProjectTable() {

    const [queryString, setQueryString] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        projectsBySearch(queryString).then((projectResponse) => {
            setProjects(projectResponse?.data?.projectsBySearch);
        });
    }, [queryString]);


    return <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    }}>

        <div>
            <input
                type="text"
                defaultValue="Search"
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
                    <td>{project.createdAt}</td>
                    <td>{project.updatedAt}</td>
                    <td>
                        <button>Update</button>
                        <button>Delete</button>
                    </td>
                </tr>)}
            </tbody>
        </table>

    </div>
}
