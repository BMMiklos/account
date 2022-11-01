import { useState } from "react";
import "./process-item.css";

export function ProcessItem({ process }) {

    const [isDetailsVisible, setDetailsVisible] = useState(false);

    return <div className="aae-process-item">

        <h4>{process?.title}</h4>
        <h4>{process?.description}</h4>

        {isDetailsVisible && <div></div>}

    </div>
}
