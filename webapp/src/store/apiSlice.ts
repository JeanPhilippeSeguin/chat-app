import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import environment from "@config/environment";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: environment.api_url, credentials: "include" }),
  endpoints: () => ({}),
});
