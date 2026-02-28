import { Outlet } from "react-router";
import { Suspense } from "react";
import { useParams } from "react-router";

import "./DashboardLayout.scss";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { useGetUserServerListQuery } from "@modules/server/services/server-api";

const DashboardLayout = () => {
  const { serverId } = useParams();

  const { data: servers } = useGetUserServerListQuery();

  const activeServer = servers?.find((server) => server.id === serverId);

  return (
    <div className="DashboardLayout">
      <DashboardHeader server={activeServer} />
      <DashboardSidebar />
      <div className="DashboardLayout__main">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardLayout;
