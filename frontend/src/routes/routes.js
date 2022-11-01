import {
    createBrowserRouter,
  } from "react-router-dom";
import { Login } from "../components/login/login";
import { ProjectTable } from "../components/project/project-table";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div></div>
    },
    {
        path: "projects",
        element: <ProjectTable/>
    }
]);
