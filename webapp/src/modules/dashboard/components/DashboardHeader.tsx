import { useNavigate } from "react-router";
import { AudioLines } from "lucide-react";

import "./DashboardHeader.scss";
import type { PublicServerProfile } from "@chat-app/shared";
import DashboardHeaderActionBar from "./DashboardHeaderActionBar";
import useGetCurrentUser from "@modules/user/hooks/useGetCurrentUser";
import AppImage from "@components/AppImage";

type Props = {
  server?: PublicServerProfile;
};

const DashboardHeader = ({ server }: Props) => {
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetCurrentUser();

  return (
    <div className="DashboardHeader">
      <AudioLines onClick={() => navigate("/")} />

      {server?.id && (
        <div className="DashboardHeader__server">
          <AppImage src={server.picture} />
          <span>{server.name}</span>
        </div>
      )}

      <div className="DashboardHeader__actionBar">
        <DashboardHeaderActionBar user={user} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default DashboardHeader;
