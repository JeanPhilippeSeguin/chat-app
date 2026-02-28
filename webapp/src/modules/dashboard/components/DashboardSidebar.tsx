import { useNavigate, useParams } from "react-router";

import "./DashboardSidebar.scss";
import ServerList from "@modules/server/components/ServerList";
import { useGetUserServerListQuery } from "@modules/server/services/server-api";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { serverId } = useParams();

  const { data: servers, isLoading } = useGetUserServerListQuery();

  const onServerListItemClickHandler = (serverId: string) => {
    navigate(`server/${serverId}`);
  };

  return (
    <div className="DashboardSidebar">
      <ServerList
        servers={servers || []}
        selectedServerId={serverId}
        isLoading={isLoading}
        onServerClickHandler={onServerListItemClickHandler}
      />
    </div>
  );
};

export default DashboardSidebar;
