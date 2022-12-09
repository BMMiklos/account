import { useUpdateProjectDispatch } from "../../../../../../context/update-project.context";
import "./entry-board-item.css";

export function EntryBoardItem({ entry }) {

    const updateProjectDispatch = useUpdateProjectDispatch();

    return <div draggable onDragStart={(event) => { updateProjectDispatch({ type: "SET_SELECTED_ENTRY", payload: entry }) }} className="aae-entry-board-item">
        {entry.title}
    </div>
}
