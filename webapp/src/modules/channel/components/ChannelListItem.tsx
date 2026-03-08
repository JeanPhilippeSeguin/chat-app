import { HashIcon, Mic } from "lucide-react";

import "./ChannelListItem.scss";
import type { PublicChannelProfile } from "@chat-app/shared";

interface Props extends PublicChannelProfile {
  isActive: boolean;
  onChannelClick: (channel: PublicChannelProfile) => void;
}

const ChannelListItem = ({ isActive, onChannelClick, ...channel }: Props) => {
  let className = "ChannelListItem";

  if (isActive) {
    className = `${className} ChannelListItem--isActive`;
  }

  return (
    <div className={className} onClick={() => onChannelClick(channel)}>
      {channel.type === "voice" ? <Mic size={16} /> : <HashIcon size={16} />}{" "}
      {channel.name}
    </div>
  );
};

export default ChannelListItem;
