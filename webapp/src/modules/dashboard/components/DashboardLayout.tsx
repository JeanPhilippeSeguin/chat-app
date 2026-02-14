import { Outlet } from "react-router";
import { Suspense } from "react";

import "./DashboardLayout.scss";

const DashboardLayout = () => {
  return (
    <div className="DashboardLayout">
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
