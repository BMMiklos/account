import { useState, useEffect } from "react";
import { EntryBoardItem } from "./entry-board-item/entry-board-item";
import "./process-board-card.css";

export function ProcessBoardCard({ process }) {

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        if (process) {
            setEntries(process.entries);
        }
    }, [process]);

    return <div className="aae-process-card">
        <h3 className="aae-process-card__title">{process.title}</h3>

        {entries?.map((entry, index) => <div key={`${entry._id}-${index}`} className="aae-process-card__entry">
            <EntryBoardItem entry={entry} />
        </div>)}

    </div>
}
