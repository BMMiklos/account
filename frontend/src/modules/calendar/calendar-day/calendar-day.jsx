import "./calendar-day.css";
import { useEffect, useState } from "react";
import { useCalendarState, useCalendarDispatch } from "../../../context/calendar.context";

export function CalendarDay({ time, disabled }) {

    const calendarDispatch = useCalendarDispatch();
    const calendarState = useCalendarState();

    const [date, setDate] = useState(new Date(time));

    useEffect(() => { }, [date]);

    return <>
        {disabled && <div className="aae-calendar-day aae-calendar-day--disabled">{date.toISOString().split("T")[0]} {date.getDay()}</div>}
        {
            !disabled && <div
                onClick={() => {
                    calendarDispatch({ type: "SET_STATE", payload: { selectedDate: time } });
                }}
                className={calendarState.selectedDate == time ? "aae-calendar-day aae-calendar-day--selected" : "aae-calendar-day"}>{date.toISOString().split("T")[0]} {date.getDay()}
            </div >
        }
    </>
}
