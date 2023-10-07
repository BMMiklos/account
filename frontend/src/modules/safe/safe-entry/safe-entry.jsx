import "./safe-entry.css";
import { useSafeDispatch } from "../../../context/safe.context";

export function SafeEntry({ safe }) {

  const safeDispatch = useSafeDispatch();

  return <div className="aae-safe-entry">

    {safe.label}

    <button
      onClick={() => {
        safeDispatch({ type: "SET_STATE", payload: { selectedSafe: safe._id } });
      }}>
      Részletek
    </button>

  </div>
}
