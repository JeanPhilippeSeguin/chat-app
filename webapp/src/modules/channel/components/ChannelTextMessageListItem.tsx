import "./ChannelTextMessageListItem.scss";
import type { PublicMessageProfile } from "@chat-app/shared";
import useGetCurrentUser from "@modules/user/hooks/useGetCurrentUser";

type Props = PublicMessageProfile;

const ChannelTextMessageListItem = ({ content, author }: Props) => {
  const { data: currentUser } = useGetCurrentUser();

  let className = "ChannelTextMessageListItem";

  if (author.id === currentUser?.id) {
    className = "ChannelTextMessageListItem--authored";
  }

  return (
    <div className={className}>
      <div className="ChannelTextMessageListItem__author">
        {author.username} said:
      </div>
      <div className="ChannelTextMessageListItem__value">{content}</div>
    </div>
  );
};

export default ChannelTextMessageListItem;
