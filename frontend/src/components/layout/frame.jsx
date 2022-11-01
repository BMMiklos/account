import { NotificationBar } from "../navigation/notification-bar";
import { Sidebar } from "../navigation/sidebar";
import { Outlet } from "react-router-dom";
import "./frame.css";

export function Frame() {
    return <div className="aae-frame">

        <div className="aae-frame__notification">
            <NotificationBar />
        </div>

        <div className="aae-frame__wrapper">

            <div className="aae-frame__navigation">
                <Sidebar />
            </div>

            <div className="aae-frame__content">
                <Outlet />
            </div>

        </div>
    </div>
}
