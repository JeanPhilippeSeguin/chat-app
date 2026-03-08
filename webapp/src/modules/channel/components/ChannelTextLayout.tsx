import { useParams } from "react-router";

import "./ChannelTextLayout.scss";
import AppTextInput from "@components/AppTextInput";
import ChannelTextMessageList from "./ChannelTextMessageList";
import AppSkeleton from "@components/AppSkeleton";
import { useGetChannelMessageListQuery } from "@modules/channel-message/services/channel-message-api";

const ChannelTextLayout = () => {
  const { channelId } = useParams();

  const { data: channelMessageList = [], isLoading } =
    useGetChannelMessageListQuery(channelId ?? "");
  return (
    <div className="ChannelTextLayout">
      {isLoading ? (
        <AppSkeleton />
      ) : (
        <ChannelTextMessageList messages={channelMessageList} />
      )}

      <AppTextInput placeholder="Message this channel" />
    </div>
  );
};

export default ChannelTextLayout;
