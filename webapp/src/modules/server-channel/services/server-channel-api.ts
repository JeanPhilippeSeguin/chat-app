import type { PublicChannelProfile } from "@chat-app/shared";
import { apiSlice } from "@store/apiSlice";

const baseUrl = "server-channel";

const serverChannelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServerChannelList: builder.query<PublicChannelProfile[], void>({
      query: () => ({
        url: `${baseUrl}/list`,
      }),
    }),
  }),
});

export const { useGetServerChannelListQuery } = serverChannelApi;
