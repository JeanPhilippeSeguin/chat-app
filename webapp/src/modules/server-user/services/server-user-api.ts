import type { PublicServerProfileList } from "@chat-app/shared";
import { apiSlice } from "@store/apiSlice";

const baseUrl = "server-user";

const serverUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserServerList: builder.query<PublicServerProfileList, void>({
      query: () => ({
        url: `${baseUrl}/list`,
      }),
    }),
  }),
});

export const { useGetUserServerListQuery } = serverUserApi;
