import { useState } from "react";
import { ProcessCreateForm } from "./process-create-form/process-create-form";
import "./process-create.css";

export function ProcessCreate({ project }) {

    const [processCreateVisible, setProcessCreateVisible] = useState(false);

    return <div className="aae-process-create">

        {!processCreateVisible && <button onClick={() => { setProcessCreateVisible(true) }} className="aae-process-create__craete-button">
            New process
        </button>}

        {processCreateVisible && <div className="aae-process-create__form-wrapper">
            <ProcessCreateForm project={project} />
            <button onClick={() => { setProcessCreateVisible(false) }} className="aae-process-create__form-close-button">Close</button>
        </div>}

    </div>
}
