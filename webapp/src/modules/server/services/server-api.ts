import type {
  PublicServerDetails,
  PublicServerProfileList,
} from "@chat-app/shared";
import { apiSlice } from "@store/apiSlice";

const baseUrl = "server";

const serverApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserServerList: builder.query<PublicServerProfileList, void>({
      query: () => ({
        url: `${baseUrl}/list`,
      }),
    }),
    getServerDetails: builder.query<PublicServerDetails, string>({
      query: (serverId: string) => ({
        method: "post",
        url: `${baseUrl}/profile`,
        body: {
          id: serverId,
        },
      }),
    }),
  }),
});

export const { useGetUserServerListQuery, useGetServerDetailsQuery } =
  serverApi;
