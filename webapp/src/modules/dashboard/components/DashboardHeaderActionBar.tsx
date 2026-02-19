import { Settings } from "lucide-react";

import "./DashboardHeaderActionBar.scss";
import type { PublicUserProfile } from "@chat-app/shared";
import AppImage from "@components/AppImage";

type Props = {
  user?: PublicUserProfile;
  isLoading: boolean;
};

const DashboardHeaderActionBar = ({ user, isLoading }: Props) => {
  if (!user?.id && !isLoading) {
    return <DashboardHeaderLoggedOutActionBar />;
  }
  return (
    <div className="DashboardHeaderActionBar">
      <span className="DashboardHeaderActionBar__separator"></span>
      <Settings className="DashboardHeaderActionBar__settings" size={20} />
      <span className="DashboardHeaderActionBar__separator"></span>

      <AppImage
        key={user?.id}
        className="DashboardHeaderActionBar__avatar"
        src={user?.picture}
        alt="Profile picture"
        draggable={false}
      />
    </div>
  );
};

const DashboardHeaderLoggedOutActionBar = () => {
  return <a href="http://localhost:3000/api/auth/google">Login</a>;
};

export default DashboardHeaderActionBar;
