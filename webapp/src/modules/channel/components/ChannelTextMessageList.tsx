import { useEffect, useRef } from "react";

import type { PublicMessageProfile } from "@chat-app/shared";

import "./ChannelTextMessageList.scss";
import ChannelTextMessageListItem from "./ChannelTextMessageListItem";

type Props = {
  messages: PublicMessageProfile[];
};

const ChannelTextMessageList = ({ messages }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.scrollTop = ref.current.scrollHeight;
  }, []);

  return (
    <div className="ChannelTextMessageList" ref={ref}>
      {messages.map((message) => (
        <ChannelTextMessageListItem key={message.id} {...message} />
      ))}
    </div>
  );
};

export default ChannelTextMessageList;
