import { useSelector } from "react-redux";

import type { PublicUserProfile } from "@chat-app/shared";
import { selectUserProfile } from "@modules/user/redux/user-selector";

const useGetCurrentUser = (): PublicUserProfile | null => {
  return useSelector(selectUserProfile);
};

export default useGetCurrentUser;
