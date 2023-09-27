import { useEffect, useState } from "react";
import { safes as getSafes } from "../../api/safe/safe.queries";
import { SafeEntry } from "./safe-entry/safe-entry";
import "./safe.css";

function Safe() {

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
