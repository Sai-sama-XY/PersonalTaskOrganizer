import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";
import GuestLayout from "./Layout/GuestLayout";
import TaskManagementPage from "./TaskManagementPage";
import TaskSchedulerPage from "./TaskSchedulerPage";
import TaskStatisticsPage from "./TaskStatisticsPage";
import SettingsPage from "./SettingsPage";
import { isAuthenticated } from "@/lib/utils/auth";
import NotFoundPage from "./NotFoundPage";
import { ProtectedRoute } from "@/lib/utils/ProtectedRoute";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><DefaultLayout /></ProtectedRoute>,
        children: [
           
            {
                path: "homepage",
                element: <Homepage />,
            },
            {
                path: "taskmanagement",
                element: <TaskManagementPage />,
            },
            {
                path: "/taskscheduler",
                element: <TaskSchedulerPage />,
            },
            {
                path: "/taskstatistics",
                element: <TaskStatisticsPage />,
            },
            {
                path: "/settings",
                element: <SettingsPage />,
            },
            {
              path: "/logout",
              element: <Navigate to="/login"/>,
          },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "register",
                element: isAuthenticated()?<Navigate to="/homepage"/>:<Register />,
            },
            {
                path: "login",
                element: isAuthenticated()?<Navigate to="/homepage"/>:<Login />,
            },
        ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    }
]);

export default Router;
