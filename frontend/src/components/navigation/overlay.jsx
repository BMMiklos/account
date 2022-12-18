import { useEffect } from "react";
import { useOverlayState, useOverlayDispatch } from "../../context/overlay.context";
import "./overlay.css";

function OverlaySkeleteon({ title }) {
    
    const overlayDispatch = useOverlayDispatch();

    return <div className="aae-overlay-skeleton">
        <h1>{title}</h1>
        <h2>Yeah!!! Overlay skeleton is here!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse cupiditate ducimus eos itaque maxime architecto explicabo temporibus quasi dolore mollitia rem eius quaerat corporis consequatur illum, beatae sed qui veniam.</p>
        <button onClick={() => { overlayDispatch({ type: "RESET" }) }}>Close</button>
    </div>
}

export function Overlay() {

    const overlayState = useOverlayState();
    const overlayDispatch = useOverlayDispatch();

    // overlay demo
    /*
    useEffect(() => {
        overlayDispatch({
            type: "SET_ELEMENT_TO_RENDER", payload: {
                element: <OverlaySkeleteon title="He???" />,
                innerStyle: {
                    boxShadow: "4px 4px 16px gray"
                }
            }
        });
    }, []);
    */

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
