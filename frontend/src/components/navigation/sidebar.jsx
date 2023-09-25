import { Link, useLocation } from "react-router-dom";
import * as React from "react";
import "./sidebar.css";

export function Sidebar() {

    const location = useLocation();

    return <nav className="aae-sidebar">

        <div className="aae-sidebar__link-wrapper">

            <Link className="aae-siderbar__link" to={'/'} >Home</Link>

            <Link className="aae-siderbar__link" to={'/projects'} >Projects</Link>

            {location?.pathname?.includes("/projects") && <>
                <Link className="aae-siderbar__link aae-siderbar__link--sublink" to={'/projects/new'} >New project</Link>
            </>}

            <Link className="aae-siderbar__link" to={'/'} >Notifications</Link>
            <Link className="aae-siderbar__link" to={'/safe'} >Safe</Link>
            <Link className="aae-siderbar__link" to={'/calendar'} >Calendar</Link>
            <Link className="aae-siderbar__link" to={'/'} >Logout</Link>
        </div>

        <small className="aae-sidebar__label">You are running this application in <strong>{process.env.NODE_ENV}</strong> mode.</small>
        <small className="aae-sidebar__label">GraphQL api set to <strong>{process.env.REACT_APP_GRAPHQL_API}</strong></small>

    </nav>
}
