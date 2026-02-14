import type { RootState } from "@store/store";

export const selectUserProfile = (state: RootState) => state.user;
