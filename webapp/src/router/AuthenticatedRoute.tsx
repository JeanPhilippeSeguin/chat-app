import { Navigate, Outlet } from "react-router";

import useGetCurrentUser from "@modules/user/hooks/useGetCurrentUser";

const AuthenticatedRoute = () => {
  const currentUser = useGetCurrentUser();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
