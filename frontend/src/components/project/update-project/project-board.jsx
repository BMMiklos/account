import { useState } from "react";
import { useEffect } from "react"

export function ProjectBoard(project) {

    const [processes, setProcesses] = useState([]);
    const [entries, setEntries] = useState([]);

    useEffect(() => { }, [project])

    return <div className="aae-project-board"></div>
}
