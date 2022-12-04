import { useState } from "react";
import "./process-card.css";

export function ProcessCard({ process }) {

    const [entries, setEntries] = useState([]);
    
    return <div className="aae-process-card">
        <b>{process.title}</b>
    </div>
}
