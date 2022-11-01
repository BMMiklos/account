import "./project-table.css";

export function ProjectTable() {
    return <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
    }}>

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
                <tr>
                    <td>My Project</td>
                    <td>Egy új cucc van itt nagyon jó</td>
                    <td>2022.11.01</td>
                    <td>2022.08.32</td>
                    <td>
                        <button>Update</button>
                        <button>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>Second Project</td>
                    <td>Második projekt</td>
                    <td>2022.11.01</td>
                    <td>2022.08.32</td>
                    <td>
                        <button>Update</button>
                        <button>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
}
