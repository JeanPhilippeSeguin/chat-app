import "./ServerUserList.scss";
import type { PublicUserProfile } from "@chat-app/shared";
import ServerUserListItem from "./ServerUserListItem";
import AppSkeleton from "@components/AppSkeleton";

type Props = {
  users: PublicUserProfile[];
  isLoading: boolean;
};

const ServerUserList = ({ users, isLoading }: Props) => {
  return (
    <div className="ServerUserList">
      {isLoading && (
        <>
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
        </>
      )}
      {users?.length > 0 &&
        users.map((user) => <ServerUserListItem key={user.id} user={user} />)}
    </div>
  );
};

export default ServerUserList;
