import "./safe-entry.css";

export function SafeEntry({ safe }) {
  return <div className="aae-safe-entry">

    {safe._id}
    {safe.label}

    <button>Részletek</button>

  </div>
}
