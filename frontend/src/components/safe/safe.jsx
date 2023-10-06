import { useEffect, useState } from "react";
import { safes as getSafes } from "../../api/safe/safe.queries";
import { SafeEntry } from "./safe-entry/safe-entry";
import { useSafeState } from "../../context/safe.context";
import { useOverlayDispatch } from "../../context/overlay.context";
import "./safe.css";

function Safe() {

    const safeState = useSafeState();
    const overlayDispatch = useOverlayDispatch();

    useEffect(() => {

        if (safeState.selectedSafe) {

            overlayDispatch({
                type: "SET_ELEMENT_TO_RENDER",
                payload: {
                    element: <></>,
                    overlayBackdropStyle: { display: "block" },
                    overlayContainerStyle: {
                        position: "absolute",
                        right: 0,
                        width: "350px",
                        height: "100%"
                    }
                }
            });

        }

    }, [safeState]);

    const [safes, setSafes] = useState([]);

    useEffect(() => {

        getSafes({
            safeFilter: {
                label: "",
                description: ""
            }
        }).then((response) => {
            if (response?.data?.safes) {
                setSafes([...response.data.safes]);
            }
        });

    }, []);

    return <div className="aae-safe">

        <h3 className="aae-safe__title">
            # Safe
        </h3>

        <div className="aae-safe__entry-wrapper">
            {safes.map((safe) => <SafeEntry safe={safe} />)}
        </div>

    </div>
}

export { Safe };
