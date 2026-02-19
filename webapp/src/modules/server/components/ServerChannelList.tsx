import {
  TextChannelList,
  VoiceChannelList,
} from "@modules/channel/components/ChannelList";

import "./ServerChannelList.scss";
import ChannelListItem from "@modules/channel/components/ChannelListItem";
type Props = {
  channels: { name: string; type: "voice" | "text" }[];
};

const ServerChannelList = ({ channels }: Props) => {
  const voiceChannels = channels.filter((channel) => channel.type === "voice");
  const textChannels = channels.filter((channel) => channel.type === "text");
  return (
    <div className="ServerChannelList">
      <TextChannelList>
        {textChannels.map((textChannel) => (
          <ChannelListItem {...textChannel} />
        ))}
      </TextChannelList>
      <VoiceChannelList>
        {voiceChannels.map((voiceChannel) => (
          <ChannelListItem {...voiceChannel} />
        ))}
      </VoiceChannelList>
    </div>
  );
};

export default ServerChannelList;
