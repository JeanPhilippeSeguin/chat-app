import "./ServerUserListItem.scss";
import type { PublicUserProfile } from "@chat-app/shared";
import AppImage from "@components/AppImage";

type Props = {
  user: PublicUserProfile;
};

const ServerUserListItem = ({ user }: Props) => {
  return (
    <div className="ServerUserListItem">
      <AppImage
        className="ServerUserListItem__picture"
        src={user.picture}
        draggable={false}
      />
      {user.username}
    </div>
  );
};

export default ServerUserListItem;
