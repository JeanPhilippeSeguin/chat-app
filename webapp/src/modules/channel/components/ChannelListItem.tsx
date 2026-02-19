import { HashIcon, Mic } from "lucide-react";

import "./ChannelListItem.scss";

type Props = {
  name: string;
  type: "voice" | "text";
};

const ChannelListItem = ({ name, type }: Props) => {
  return (
    <div className="ChannelListItem">
      {type === "voice" ? <Mic size={16} /> : <HashIcon size={16} />} {name}
    </div>
  );
};

export default ChannelListItem;
