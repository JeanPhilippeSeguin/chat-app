import type { PublicMessageProfile } from "@chat-app/shared";
import { apiSlice } from "@store/apiSlice";

const baseUrl = "channel-message";

const channelMessageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChannelMessageList: builder.query<PublicMessageProfile[], string>({
      query: (channelId) => ({
        url: `${baseUrl}/${channelId}`,
      }),
    }),
    createChannelMessage: builder.mutation<
      boolean,
      { channelId: string; content: string }
    >({
      query: ({ channelId, content }) => ({
        method: "post",
        url: `${baseUrl}/${channelId}`,
        body: {
          content,
        },
      }),
    }),
  }),
});

export const {
  useGetChannelMessageListQuery,
  useCreateChannelMessageMutation,
} = channelMessageApi;
