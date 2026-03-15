import "./ChannelTextMessageList.scss";
import ChannelTextMessageListItem from "./ChannelTextMessageListItem";
import type { PublicMessageProfile } from "@chat-app/shared";

type Props = {
  messages: PublicMessageProfile[];
};

const ChannelTextMessageList = ({ messages }: Props) => {
  return (
    <div className="ChannelTextMessageList">
      {messages.map((message) => (
        <ChannelTextMessageListItem key={message.id} {...message} />
      ))}
    </div>
  );
};

export default ChannelTextMessageList;
