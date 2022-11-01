import { Link } from "react-router-dom";
import * as React from "react";
import "./sidebar.css";

export function Sidebar() {
    return <nav className="aae-sidebar">
        <Link className="aae-siderbar__link" to={'/'} >Home</Link>
        <Link className="aae-siderbar__link" to={'projects'} >Proejcts</Link>
        <Link className="aae-siderbar__link" to={'/'} >Notifications</Link>
        <Link className="aae-siderbar__link" to={'/'} >Logout</Link>
    </nav>
}
