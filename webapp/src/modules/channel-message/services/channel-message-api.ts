import type { PublicMessageProfile } from "@chat-app/shared";
import { apiSlice } from "@store/apiSlice";

const baseUrl = "channel-message";

const channelMessageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChannelMessageList: builder.query<PublicMessageProfile[], string>({
      query: (channelId) => ({
        url: `${baseUrl}/${channelId}/list`,
      }),
    }),
  }),
});

export const { useGetChannelMessageListQuery } = channelMessageApi;
