import { useParams } from "react-router";
import { Command } from "lucide-react";

import "./ServerPage.scss";
import { useGetServerDetailsQuery } from "../services/server-api";
import ServerChannelList from "../components/ServerChannelList";
import AppTextInput from "@components/AppTextInput";
import ServerUserList from "../components/ServerUserList";
import { ChannelType } from "@chat-app/shared";

const ServerPage = () => {
  const { serverId } = useParams();

  const { data: server, isLoading } = useGetServerDetailsQuery(serverId || "");

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
          channels={[
            { id: "a", type: ChannelType.VOICE, name: "working" },
            { id: "b", type: ChannelType.TEXT, name: "general" },
          ]}
          isLoading={isLoading}
        />
      </div>

      <div className="ServerPage__content">
        <div className="ServerPage__content__main">
          <div></div>
          <ServerUserList users={server?.users || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ServerPage;
