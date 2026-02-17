import type { PublicUserProfile } from "@chat-app/shared";
import { apiSlice } from "@store/apiSlice";

const baseUrl = "user";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<PublicUserProfile, void>({
      query: () => ({
        url: `${baseUrl}/me`,
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
