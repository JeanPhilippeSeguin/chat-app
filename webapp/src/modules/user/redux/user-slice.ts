import { createSlice } from "@reduxjs/toolkit";

import type { PublicUserProfile } from "@chat-app/shared";

export const userSlice = createSlice({
  name: "user",
  initialState: null as PublicUserProfile | null,
  reducers: {},
});

export default userSlice.reducer;
