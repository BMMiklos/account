import { useEffect, useState } from "react";
import "./calendar.css";
import { CalendarDay } from "./calendar-day/calendar-day";

export function Calendar() {

    const [selectedMonthTime, setSelectedMonthTime] = useState(new Date().getTime());

    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {

        const selectedMonthDate = new Date(selectedMonthTime);

        console.log(selectedMonthDate)

        const firstDate = new Date(selectedMonthDate.getTime());
        firstDate.setDate(1);

        const lastDate = new Date(selectedMonthDate.getTime());
        lastDate.setMonth(lastDate.getMonth() + 1);
        lastDate.setDate(-1);

        const daysInMonth = lastDate.getDate();

        if (!isNaN(daysInMonth)) {

            let calendarTimes = [];

            for (let i = 1; i < daysInMonth + 1; i++) {
                firstDate.setDate(i);
                const dayTime = firstDate.getTime();
                calendarTimes.push(dayTime);
            }

            setCalendarDays(calendarTimes);

        }

    }, [selectedMonthTime]);

    const [beforeMonthDays, setBeforeMonthDays] = useState([]);
    const [afterMonthDays, setAfterMonthDays] = useState([]);

    useEffect(() => {

        const selectedMonthDate = new Date(selectedMonthTime);

        const dayInMs = 1000 * 60 * 60 * 24;

        const firstDate = new Date(selectedMonthDate.getTime());
        firstDate.setDate(1);

        let firstDayInMonth = firstDate.getDay();

        if (firstDayInMonth == 0) {
            firstDayInMonth = 7;
        }

        const firstDayInTimeUnix = firstDate.getTime() - (firstDayInMonth - 1) * dayInMs;
        const firstDateInWeek = new Date(firstDayInTimeUnix);

        let daysBeforeFirstDate = [];

        for (let i = 0; i < firstDayInMonth - 1; i++) {
            let dayTime = firstDateInWeek.getTime() + dayInMs * i;
            daysBeforeFirstDate.push(dayTime);
        }

        setBeforeMonthDays(daysBeforeFirstDate);

        const lastDate = new Date(selectedMonthDate.getTime());
        lastDate.setMonth(lastDate.getMonth() + 1);
        lastDate.setDate(-1);

        let lastDayInMonth = lastDate.getDay();

        if (lastDayInMonth == 0) {
            lastDayInMonth = 7;
        }

        let daysAfterLastDate = [];

        for (let i = 0; i < 7 - lastDayInMonth; i++) {
            let dayTime = lastDate.getTime() + i * dayInMs;
            daysAfterLastDate.push(dayTime);
        }

        setAfterMonthDays(daysAfterLastDate);

    }, [calendarDays]);

    return <div className="aae-calendar">

        <div className="aae-calendar__header">
            <div>Hétfő</div>
            <div>Kedd</div>
            <div>Szerda</div>
            <div>Csütörtök</div>
            <div>Péntek</div>
            <div>Szombat</div>
            <div>Vasárnap</div>
        </div>

        <div className="aae-calendar__grid">
            {beforeMonthDays.map((time) => <CalendarDay key={time} time={time} disabled={true} />)}
            {calendarDays.map((time) => <CalendarDay key={time} time={time} disabled={false} />)}
            {afterMonthDays.map((time) => <CalendarDay key={time} time={time} disabled={true} />)}
        </div>

        <div>
            <button onClick={() => {
                setSelectedMonthTime((monthTime) => monthTime + 1000 * 60 * 60 * 24 * 30);
            }}>
                Előre
            </button>
        </div>

    </div>
}