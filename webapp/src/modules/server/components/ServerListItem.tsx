import "./ServerListItem.scss";
import type { PublicServerProfile } from "@chat-app/shared";
import AppImage from "@components/AppImage";

interface Props {
  server: PublicServerProfile;
  isActive: boolean;
  onClick: (serverId: string) => void;
}

const ServerListItem = ({ server, isActive, onClick }: Props) => {
  const onClickHandler = () => {
    if (isActive) {
      return;
    }

    onClick(server.id);
  };

  let className = "ServerListItem";

  if (isActive) {
    className = `${className} ServerListItem--isActive`;
  }

  return (
    <div className={className} onClick={onClickHandler}>
      <AppImage
        className="ServerListItem__picture"
        src={server.picture}
        draggable={false}
      />
    </div>
  );
};

export default ServerListItem;
