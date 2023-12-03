import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import md5 from "md5";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://0001.uz",
});

const baseQueryWithSign = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  const { key, secret } = api.getState().auth;
  const headers = new Headers();
  const stringBody = args.body ? JSON.stringify(args.body) : "";
  const sign = md5(`${args.method}${args.url}${stringBody}${secret}`);

  console.log("args", args);
  headers.append("key", key);

  headers.append("sign", sign);
  args.headers = headers;

  let result = await baseQuery(args, api, extraOptions);

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithSign,
  tagTypes: ["Book", "User"],
  endpoints: (builder) => ({}),
});
