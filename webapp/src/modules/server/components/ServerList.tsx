import "./ServerList.scss";
import type { PublicServerProfileList } from "@chat-app/shared";
import AppSkeleton from "@components/AppSkeleton";
import ServerListItem from "./ServerListItem";

interface Props {
  servers: PublicServerProfileList;
  selectedServerId?: string;
  isLoading: boolean;
  onServerClickHandler?: (serverId: string) => void;
}

const ServerList = ({
  servers,
  selectedServerId,
  isLoading,
  onServerClickHandler,
}: Props) => {
  const onServerListItemClickHandler = (serverId: string) => {
    if (onServerClickHandler) {
      onServerClickHandler(serverId);
    }
  };

  return (
    <div className="ServerList">
      {isLoading ? (
        <>
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
        </>
      ) : (
        servers?.length > 0 &&
        servers.map((server) => (
          <ServerListItem
            key={server.id}
            server={server}
            onClick={() => onServerListItemClickHandler(server.id)}
            isActive={selectedServerId ? selectedServerId === server.id : false}
          />
        ))
      )}
    </div>
  );
};

export default ServerList;
