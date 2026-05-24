import { io } from "socket.io-client";

import type { PublicMessageProfile } from "@chat-app/shared";

import environment from "@config/environment";
import { apiSlice } from "@store/apiSlice";

const baseUrl = "channel-message";

const channelMessageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChannelMessageList: builder.query<PublicMessageProfile[], string>({
      query: (channelId) => ({
        url: `${baseUrl}/${channelId}`,
      }),
      async onCacheEntryAdded(
        channelId: string,
        { updateCachedData, cacheDataLoaded },
      ) {
        const socket = io(`${environment.api_url}/channel-message`, {
          query: { channelUUID: channelId },
          withCredentials: true,
        });

        await cacheDataLoaded;

        socket.emit("messages");

        socket.on("message", (data: PublicMessageProfile) => {
          updateCachedData((draft) => {
            draft.push(data);
          });
        });
      },
    }),
    createChannelMessage: builder.mutation<
      boolean,
      { channelId: string; content: string }
    >({
      async queryFn({ channelId, content }) {
        const socket = io(`${environment.api_url}/channel-message`, {
          query: { channelUUID: channelId },
          withCredentials: true,
        });

        socket.emit("create", { content });
        return { data: true };
      },
    }),
  }),
});

export const {
  useGetChannelMessageListQuery,
  useCreateChannelMessageMutation,
} = channelMessageApi;
