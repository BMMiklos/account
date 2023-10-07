import { useOverlayDispatch } from "../../../context/overlay.context";

export function CalendarContextMenu({ selectedDate }) {

  const overlayDispatch = useOverlayDispatch();

  return <>
    calendar context menu
    {selectedDate}
    <button onClick={() => { overlayDispatch({ type: "RESET" }) }}>Bezárás</button>
  </>
}
