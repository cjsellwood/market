import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { toggleLogin } from "./authSlice";

let store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe("Auth Slice redux testing", () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });
  test("loggedIn should initially be false", () => {
    expect(store.getState().auth.loggedIn).toBe(false);
  });

  test("loggedIn should be toggled by action toggleLogin", () => {
    const state = authReducer({ loggedIn: false }, toggleLogin);

    expect(state.loggedIn).toBe(true);
  });
});

export {};
