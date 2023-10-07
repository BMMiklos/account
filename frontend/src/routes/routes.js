import { createBrowserRouter } from "react-router-dom";
import { Frame } from "../modules/layout/frame";
import { Login } from "../modules/login/login";
import { CreateProject } from "../modules/project/create-project";
import { Project } from "../modules/project/project";
import { UpdateProject } from "../modules/project/update-project";
import { Safe } from "../modules/safe/safe";
import { UpdateProjectProvider } from "../context/update-project.context";
import { Calendar } from "../modules/calendar/calendar";
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
        element: <Project />,
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
