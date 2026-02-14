import type { PublicUserProfile } from "@chat-app/shared";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null as PublicUserProfile | null,
  reducers: {
    setUserProfile: (
      _state,
      action: PayloadAction<PublicUserProfile>,
    ): PublicUserProfile | null => {
      if (!action.payload) {
        return null;
      }

      return {
        ...action.payload,
      };
    },
  },
});

export const { setUserProfile } = userSlice.actions;

export default userSlice.reducer;
