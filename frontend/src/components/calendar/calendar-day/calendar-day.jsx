import "./calendar-day.css";
import { useState } from "react";
import { useCalendarDispatch } from "../../../context/calendar.context";

export function CalendarDay({ time, disabled }) {

    const calendarDispatch = useCalendarDispatch();

    const [date, setDate] = useState(new Date(time));

    return <>
        {disabled && <div className="aae-calendar-day aae-calendar-day--disabled">{date.toISOString().split("T")[0]} {date.getDay()}</div>}
        {!disabled && <div onClick={() => { calendarDispatch({ type: "SET_STATE", payload: { selectedDate: time } }) }} className="aae-calendar-day">{date.toISOString().split("T")[0]} {date.getDay()}</div>}
    </>
}
