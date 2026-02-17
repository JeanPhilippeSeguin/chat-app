import { skipToken } from "@reduxjs/toolkit/query";

import { useIsAuthenticated } from "@modules/auth/hooks/useIsAuthenticated";
import { useGetCurrentUserQuery } from "../services/user-api";

const useGetCurrentUser = () => {
  const isAuthenticated = useIsAuthenticated();

  return useGetCurrentUserQuery(isAuthenticated ? undefined : skipToken);
};

export default useGetCurrentUser;
