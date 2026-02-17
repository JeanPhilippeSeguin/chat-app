import { Outlet } from "react-router";
import { Suspense } from "react";

import "./DashboardLayout.scss";
import useGetCurrentUser from "@modules/user/hooks/useGetCurrentUser";
import DashboardUserSidebar from "./DashboardUserSidebar";

const DashboardLayout = () => {
  const { data: user } = useGetCurrentUser();

  return (
    <div className="DashboardLayout">
      <DashboardUserSidebar />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
