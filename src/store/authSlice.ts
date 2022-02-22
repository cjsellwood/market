import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.loggedIn = !state.loggedIn;
    },
  },
});

export const { toggleLogin } = authSlice.actions;

export default authSlice.reducer;
