import { createBrowserRouter } from "react-router-dom";
import { Frame } from "../components/layout/frame";
import { Login } from "../components/login/login";
import { CreateProject } from "../components/project/create-project";
import { ProjectTable } from "../components/project/project-table";
import { UpdateProject } from "../components/project/update-project";
import { Safe } from "../components/safe/safe";
import { UpdateProjectProvider } from "../context/update-project.context";
import { Calendar } from "../components/calendar/calendar";
import { CalendarProvider } from "../context/calendar.context";
import { SafeProvider } from "../context/safe.context";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "projects",
        element: <ProjectTable />,
      },
      {
        path: "projects/new",
        element: <CreateProject />,
      },
      {
        path: "projects/:id",
        element: (
          <UpdateProjectProvider>
            <UpdateProject />
          </UpdateProjectProvider>
        ),
      },
      {
        path: "safe",
        element: (
          <SafeProvider>
            <Safe />
          </SafeProvider>
        )
      },
      {
        path: "calendar",
        element: (
          <CalendarProvider>
            <Calendar />
          </CalendarProvider>
        )
      }
    ],
  },
]);
