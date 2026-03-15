import "./ChannelTextMessageListItem.scss";
import type { PublicMessageProfile } from "@chat-app/shared";
import AppImage from "@components/AppImage";
import useGetCurrentUser from "@modules/user/hooks/useGetCurrentUser";

type Props = PublicMessageProfile;

const ChannelTextMessageListItem = ({ content, author }: Props) => {
  const { data: currentUser } = useGetCurrentUser();

  let className = "ChannelTextMessageListItem";

  if (author.id === currentUser?.id) {
    className = `${className} ChannelTextMessageListItem--authored`;
  }

  return (
    <div className={className}>
      <AppImage
        className="ChannelTextMessageListItem__author__picture"
        src={author.picture}
        draggable="false"
      />
      <div className="ChannelTextMessageListItem__content">
        <div className="ChannelTextMessageListItem__content__author">
          {author.username} said:
        </div>
        <div className="ChannelTextMessageListItem__content__value">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChannelTextMessageListItem;
