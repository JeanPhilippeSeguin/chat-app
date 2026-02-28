import type { ReactNode } from "react";

import "./ChannelList.scss";

type Props = {
  children: ReactNode[];
};

const ChannelList = ({ children }: Props) => {
  return (
    <div className="ChannelList">
      {children?.length ? (
        children
      ) : (
        <div className="ChannelList__empty">No channels</div>
      )}
    </div>
  );
};

type ChannelListHeaderProps = {
  children: ReactNode;
};

const ChannelListHeader = ({ children }: ChannelListHeaderProps) => {
  return <div className="ChannelListHeader">{children}</div>;
};

ChannelList.Header = ChannelListHeader;

export default ChannelList;
