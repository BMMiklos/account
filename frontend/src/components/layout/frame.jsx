import { Login } from "../login/login";
import { NotificationBar } from "../navigation/notification-bar";
import { Sidebar } from "../navigation/sidebar";

import "./frame.css";

import {
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { router } from "../../routes/routes";

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
                <RouterProvider router={router}>
                    <Outlet />
                </RouterProvider>
            </div>

        </div>

    </div>
}
