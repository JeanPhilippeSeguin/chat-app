import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import publicRouter from "./PublicRouter";
import AuthenticatedRoute from "./AuthenticatedRoute";
import ServerRouter from "@modules/server/router/ServerRouter";

const DashboardLayout = lazy(
  () => import("@modules/dashboard/components/DashboardLayout"),
);
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Error</div>,
    element: <DashboardLayout />,
    children: [
      ...publicRouter(),
      { element: <AuthenticatedRoute />, children: [...ServerRouter()] },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace={true} />,
  },
]);

export default router;
