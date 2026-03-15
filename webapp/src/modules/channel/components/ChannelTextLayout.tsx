import { useParams } from "react-router";
import { useState, type KeyboardEvent } from "react";

import "./ChannelTextLayout.scss";
import { AppTextAreaInput } from "@components/AppTextInput";
import ChannelTextMessageList from "./ChannelTextMessageList";
import AppSkeleton from "@components/AppSkeleton";
import {
  useCreateChannelMessageMutation,
  useGetChannelMessageListQuery,
} from "@modules/channel-message/services/channel-message-api";

const ChannelTextLayout = () => {
  const [messageContent, setMessageContent] = useState<string>("");

  const { channelId } = useParams();

  const { data: channelMessageList = [], isLoading } =
    useGetChannelMessageListQuery(channelId ?? "");

  const [createChannelMessage] = useCreateChannelMessageMutation();

  const onInputKeyDownHandler = (e: KeyboardEvent) => {
    const { key, shiftKey } = e;
    const isSubmit = key === "Enter" && !shiftKey;

    if (!messageContent && key === "Enter") {
      e.preventDefault();
      return;
    }

    if (!isSubmit) {
      return;
    }

    e.preventDefault();
    setMessageContent("");

    createChannelMessage({
      channelId: channelId ?? "",
      content: messageContent,
    })
      .unwrap()
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="ChannelTextLayout">
      {isLoading ? (
        <AppSkeleton />
      ) : (
        <ChannelTextMessageList messages={channelMessageList} />
      )}

      <div className="ChannelTextLayout__messaging">
        <AppTextAreaInput
          className="ChannelTextLayout__messaging__input"
          placeholder="Message this channel"
          variant="borderless"
          value={messageContent}
          onChange={(e) => setMessageContent(e.currentTarget.value)}
          onKeyDown={onInputKeyDownHandler}
        />
      </div>
    </div>
  );
};

export default ChannelTextLayout;
