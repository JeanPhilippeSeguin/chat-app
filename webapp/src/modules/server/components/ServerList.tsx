import type { ReactNode } from "react";

import "./ServerList.scss";

type Props = {
  children: ReactNode[];
};

const ServerList = ({ children }: Props) => {
  return <div className="ServerList">{children}</div>;
};

export default ServerList;
