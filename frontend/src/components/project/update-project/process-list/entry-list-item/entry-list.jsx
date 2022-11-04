import "./entry-list.css";

export function EntryList({ entries }) {
    return <div className="aae-entry-list">
        {entries.map((entry) => <div className="aae-entry-list-item">
            <div className="aae-entry-list-item__title">{entry.title}</div>
            <div className="aae-entry-list-item__events">
                <button>Details</button>
                <button>Delete</button>
            </div>
        </div>)}
    </div>
}
