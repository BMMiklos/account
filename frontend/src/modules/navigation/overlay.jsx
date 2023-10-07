import { useOverlayState, useOverlayDispatch } from "../../context/overlay.context";
import "./overlay.css";

export function Overlay() {

    const overlayState = useOverlayState();
    const overlayDispatch = useOverlayDispatch();

    return <>{
        overlayState?.element && <div
            className="aae-overlay">
            <div
                className="aae-overlay__backdrop"
                style={overlayState?.overlayBackdropStyle}
                onClick={() => {
                    overlayDispatch({ type: "RESET" });
                }}
            >
            </div>
            <div
                className="aae-overlay__inner"
                style={overlayState?.overlayContainerStyle}>
                {overlayState?.element}
            </div>
        </div>
    }
    </>
}
