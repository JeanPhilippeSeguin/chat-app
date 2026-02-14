import type { PublicUserProfile } from "@chat-app/shared";
import { apiSlice } from "@store/apiSlice";

const baseUrl = "user";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.mutation<PublicUserProfile, void>({
      query: () => ({
        url: `${baseUrl}/me`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCurrentUserMutation } = userApi;
