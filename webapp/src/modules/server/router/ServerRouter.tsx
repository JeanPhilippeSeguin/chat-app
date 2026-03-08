import { lazy } from "react";
import type { RouteObject } from "react-router";

const ServerPage = lazy(() => import("../pages/ServerPage"));
const ChannelLayout = lazy(
  () => import("../../channel/components/ChannelLayout"),
);

const ServerRouter = (): RouteObject[] => {
  return [
    {
      path: "/server/:serverId",
      element: <ServerPage />,
      children: [{ path: "channel/:channelId", element: <ChannelLayout /> }],
    },
  ];
};

export default ServerRouter;
