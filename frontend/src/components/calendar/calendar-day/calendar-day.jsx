import "./calendar-day.css";
import { useState } from "react"

export function CalendarDay({ time, disabled }) {

    const [date, setDate] = useState(new Date(time));

    return <>
        {disabled && <div className="aae-calendar-day aae-calendar-day--disabled">{date.toISOString().split("T")[0]} {date.getDay()}</div>}
        {!disabled && <div className="aae-calendar-day">{date.toISOString().split("T")[0]} {date.getDay()}</div>}
    </>
}
