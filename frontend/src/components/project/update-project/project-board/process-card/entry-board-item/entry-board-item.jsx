import { useState } from "react";
import { useUpdateProjectDispatch } from "../../../../../../context/update-project.context";
import "./entry-board-item.css";

export function EntryBoardItem({ entry }) {

    const updateProjectDispatch = useUpdateProjectDispatch();

    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    return <div
        draggable
        onDragStart={(event) => { updateProjectDispatch({ type: "SET_ENTRY_MOVE_SETTINGS", payload: { entry } }) }}
        className="aae-entry-board-item">

        <div className="aae-entry-board-item__header">
            <div className="aae-entry-board-item__title">{entry?.title}</div>
            <button className="aae-entry-board-item__view-button"
            onClick={() => { setDescriptionVisible(!isDescriptionVisible) }}></button>
        </div>
        {isDescriptionVisible && <div className="aae-entry-board-item__description">{entry?.description}</div>}
    </div>
}
