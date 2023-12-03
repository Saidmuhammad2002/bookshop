import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {
      key: null,
      secret: null,
      email: null,
      userName: null,
    };
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { key, secret, email, userName } = action.payload;

      state.key = key;
      state.secret = secret;
      state.email = email;
      state.userName = userName;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logOut: (state) => {
      state.key = null;
      state.secret = null;
      state.email = null;
      state.userName = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
