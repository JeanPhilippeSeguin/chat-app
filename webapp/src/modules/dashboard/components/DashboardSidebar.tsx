import "./DashboardSidebar.scss";
import type { PublicServerProfileList } from "@chat-app/shared";
import ServerList from "@modules/server/components/ServerList";
import ServerListItem from "@modules/server/components/ServerListItem";

interface Props {
  servers: PublicServerProfileList;
  activeServerId?: string;
  onServerChangeHandler: (serverId: string) => void;
}

const DashboardSidebar = ({
  servers,
  activeServerId,
  onServerChangeHandler,
}: Props) => {
  const onServerListItemClickHandler = (serverId: string) => {
    onServerChangeHandler(serverId);
  };

  return (
    <div className="DashboardSidebar">
      <ServerList>
        {servers.map((server) => (
          <ServerListItem
            server={server}
            onClick={onServerListItemClickHandler}
            isActive={activeServerId === server.id}
          />
        ))}
      </ServerList>
    </div>
  );
};

export default DashboardSidebar;
