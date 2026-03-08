import { MessageSquare, Mic } from "lucide-react";
import ChannelList from "@modules/channel/components/ChannelList";

import "./ServerChannelList.scss";
import type { PublicChannelProfile } from "@chat-app/shared";
import ChannelListItem from "@modules/channel/components/ChannelListItem";
import AppSkeleton from "@components/AppSkeleton";

interface Props {
  channels: PublicChannelProfile[];
  isLoading: boolean;
  selectedChannelId: string;
  onChannelClick: (channel: PublicChannelProfile) => void;
}

const ServerChannelList = ({
  channels,
  isLoading,
  selectedChannelId,
  onChannelClick,
}: Props) => {
  const voiceChannels = channels.filter((channel) => channel.type === "voice");
  const textChannels = channels.filter((channel) => channel.type === "text");

  let className = "ServerChannelList";

  if (isLoading) {
    className = `${className} ServerChannelList--isLoading`;
  }

  return (
    <div className={className}>
      <ChannelList>
        <ChannelList.Header>
          <Mic size={16} />
          VOICE CHANNELS (3)
        </ChannelList.Header>
        <ServerChannelListCurrentState
          channels={voiceChannels}
          isLoading={isLoading}
          selectedChannelId={selectedChannelId}
          onChannelClick={onChannelClick}
        />
      </ChannelList>

      <ChannelList>
        <ChannelList.Header>
          <MessageSquare size={16} />
          TEXT CHANNELS (3)
        </ChannelList.Header>

        <ServerChannelListCurrentState
          channels={textChannels}
          isLoading={isLoading}
          selectedChannelId={selectedChannelId}
          onChannelClick={onChannelClick}
        />
      </ChannelList>
    </div>
  );
};

const ServerChannelListCurrentState = ({
  channels,
  isLoading,
  selectedChannelId,
  onChannelClick,
}: Props) => {
  if (isLoading) {
    return <AppSkeleton />;
  }

  return channels.map((channel) => (
    <ChannelListItem
      key={channel.id}
      {...channel}
      isActive={selectedChannelId === channel.id}
      onChannelClick={onChannelClick}
    />
  ));
};

export default ServerChannelList;
