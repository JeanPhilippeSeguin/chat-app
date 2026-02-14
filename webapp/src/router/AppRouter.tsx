import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import publicRouter from "./PublicRouter";

const DashboardLayout = lazy(
  () => import("@modules/dashboard/components/DashboardLayout"),
);
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Error</div>,
    element: <DashboardLayout />,
    children: [...publicRouter()],
  },
  {
    path: "*",
    element: <Navigate to="/" replace={true} />,
  },
]);

export default router;
