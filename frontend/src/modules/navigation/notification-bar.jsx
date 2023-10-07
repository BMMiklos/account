import { useState, useEffect } from "react";
import "./notification-bar.css";

export function NotificationBar() {

    const [time, setTime] = useState("");

    useEffect(() => {
        setInterval(() => {
            let date = new Date();
            let dateString = new Intl.DateTimeFormat('hu-HU', { 
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
           }).format(date)
            setTime(`${dateString}`);
        }, 1000);
    }, []);

    return <div className="aae-notification-bar">{time}</div>
}
