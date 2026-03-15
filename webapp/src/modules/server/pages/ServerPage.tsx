import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { Command } from "lucide-react";

import "./ServerPage.scss";
import { type PublicChannelProfile } from "@chat-app/shared";
import { useGetServerDetailsQuery } from "../services/server-api";
import ServerChannelList from "../components/ServerChannelList";
import ServerUserList from "../components/ServerUserList";
import { AppTextInput } from "@components/AppTextInput";

const ServerPage = () => {
  const navigate = useNavigate();

  const { serverId, channelId } = useParams();

  const { data: server, isLoading } = useGetServerDetailsQuery(serverId ?? "");

  const onChannelClickHandler = (channel: PublicChannelProfile) => {
    navigate(`channel/${channel.id}`);
  };

  useEffect(() => {
    if (channelId) {
      return;
    }

    navigate(`channel/${server?.channels[0].id}`);
  }, [navigate, server, channelId]);

  return (
    <div className="ServerPage">
      <div className="ServerPage__header">
        <div className="ServerPage__channelList__header">
          <div className="ServerPage__channelList__server">{server?.name}</div>
          <div className="ServerPage__channelList__online">8 online</div>
        </div>

        <AppTextInput
          className="ServerPage__header__search"
          placeholder="Search"
          prefix={
            <Command className="ServerPage__header__search__prefix" size={16} />
          }
          suffix={
            <span className="ServerPage__header__search__suffix">⌘K</span>
          }
        />
      </div>
      <div className="ServerPage__channelList">
        <ServerChannelList
          channels={server?.channels ?? []}
          selectedChannelId={channelId ?? ""}
          isLoading={isLoading}
          onChannelClick={onChannelClickHandler}
        />
      </div>

      <div className="ServerPage__content">
        <div className="ServerPage__content__main">
          <Outlet />
          <ServerUserList users={server?.users || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ServerPage;
