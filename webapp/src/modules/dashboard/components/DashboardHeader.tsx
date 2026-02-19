import { AudioLines, Command } from "lucide-react";

import "./DashboardHeader.scss";
import type { PublicServerProfile } from "@chat-app/shared";
import DashboardHeaderActionBar from "./DashboardHeaderActionBar";
import useGetCurrentUser from "@modules/user/hooks/useGetCurrentUser";
import AppTextInput from "@components/AppTextInput";
import AppImage from "@components/AppImage";

type Props = {
  server?: PublicServerProfile;
};

const DashboardHeader = ({ server }: Props) => {
  const { data: user, isLoading } = useGetCurrentUser();

  return (
    <div className="DashboardHeader">
      <AudioLines />
      {server?.id && (
        <div className="DashboardHeader__server">
          <AppImage src={server.picture} />
          <span>{server.name}</span>
        </div>
      )}

      <div className="DashboardHeader__actionBar">
        <AppTextInput
          className="DashboardHeader__search"
          placeholder="Search"
          prefix={
            <Command className="DashboardHeader__search__prefix" size={16} />
          }
          suffix={<span className="DashboardHeader__search__suffix">⌘K</span>}
        />

        <DashboardHeaderActionBar user={user} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default DashboardHeader;
