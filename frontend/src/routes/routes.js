import {
    createBrowserRouter,
  } from "react-router-dom";
import { Frame } from "../components/layout/frame";
import { Login } from "../components/login/login";
import { ProjectTable } from "../components/project/project-table";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Frame/>,
        children: [
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "projects",
                element: <ProjectTable/>
            }
        ]
    },
    
]);
