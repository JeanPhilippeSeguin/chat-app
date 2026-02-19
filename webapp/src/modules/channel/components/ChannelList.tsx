import { MessageSquare, Mic } from "lucide-react";
import type { ReactNode } from "react";

import "./ChannelList.scss";

type Props = {
  children: ReactNode[];
};

const ChannelList = ({ children }: Props) => {
  return <div className="ChannelList">{children}</div>;
};

export const VoiceChannelList = ({ children }: Props) => {
  return (
    <ChannelList>
      <div className="ChannelList__header">
        <Mic size={16} />
        VOICE CHANNELS (3)
      </div>

      {children?.length ? (
        children
      ) : (
        <div className="ChannelList__empty">No channels</div>
      )}
    </ChannelList>
  );
};

export const TextChannelList = ({ children }: Props) => {
  return (
    <ChannelList>
      <div className="ChannelList__header">
        <MessageSquare size={16} />
        TEXT CHANNELS (3)
      </div>

      {children?.length ? (
        children
      ) : (
        <div className="ChannelList__empty">No channels</div>
      )}
    </ChannelList>
  );
};
