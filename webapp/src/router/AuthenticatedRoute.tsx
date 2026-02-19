import { Navigate, Outlet } from "react-router";

import useGetCurrentUser from "@modules/user/hooks/useGetCurrentUser";

const AuthenticatedRoute = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();

  if (!currentUser && !isLoading) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
