import useGetCurrentUser from "@modules/user/hooks/useGetCurrentUser";
import "./DashboardUserSidebar.scss";

const DashboardUserSidebar = () => {
  const { data: user, isLoading } = useGetCurrentUser();

  return (
    <div className="DashboardUserSidebar">
      <div className="DashboardUserSidebar__user">
        <img
          className="DashboardUserSidebar__user__picture"
          src={user?.picture}
        />
        <span className="DashboardUserSidebar__user__username">
          {user?.username}
        </span>
      </div>
    </div>
  );
};

export default DashboardUserSidebar;
