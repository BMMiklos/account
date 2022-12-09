import { useState } from "react";
import { ProcessCreateForm } from "./process-create-form/process-create-form";
import "./project-board-process-create.css";

export function ProjectBoardProcessCreate({ project }) {

    const [processCreateVisible, setProcessCreateVisible] = useState(false);

    return <div className="aae-project-board-process-create">

        {!processCreateVisible && <button onClick={() => { setProcessCreateVisible(true) }} className="aae-project-board-process-create__craete-button">
            New process
        </button>}

        {processCreateVisible && <div className="aae-project-board-process-create__form-wrapper">
            <ProcessCreateForm project={project} />
            <button onClick={() => { setProcessCreateVisible(false) }} className="aae-project-board-process-create__form-close-button">Close</button>
        </div>}

    </div>
}
