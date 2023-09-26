import { useOverlayState, useOverlayDispatch } from "../../context/overlay.context";
import "./overlay.css";

export function Overlay() {

    const overlayState = useOverlayState();
    const overlayDispatch = useOverlayDispatch();

    return <>{
        overlayState?.element && <div
            className="aae-overlay"
            style={overlayState?.overlayStyle}
        >
            <div
                className="aae-overlay__inner"
                style={overlayState?.innerStyle}>
                {overlayState?.element}
            </div>
        </div>
    }
    </>
}
