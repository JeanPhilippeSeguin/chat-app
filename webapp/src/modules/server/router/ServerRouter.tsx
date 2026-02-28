import { lazy } from "react";
import type { RouteObject } from "react-router";

const ServerPage = lazy(() => import("../pages/ServerPage"));

const ServerRouter = (): RouteObject[] => {
  return [
    {
      path: "/server/:serverId",
      element: <ServerPage />,
    },
  ];
};

export default ServerRouter;
