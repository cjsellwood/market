import { configureStore } from "@reduxjs/toolkit";
import authReducer, { registerUser, loginUser } from "../store/authSlice";

const originalFetch = window.fetch;
let store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe("Auth Slice redux testing", () => {
  beforeEach(() => {
    window.fetch = originalFetch;
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  test("State should start with initial state", () => {
    expect(store.getState().auth).toEqual({
      loading: false,
      username: null,
      email: null,
      token: null,
      expires: null,
      userId: null,
      error: null,
    });
  });

  describe("registerUser action", () => {
    test("Should register a new user", async () => {
      window.fetch = jest.fn().mockReturnValue({
        status: 200,
        json: () =>
          Promise.resolve({
            email: "jestUser@email.com",
            username: "jestUser",
            userId: 99,
            token: "2f4dfd",
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
          }),
      });

      await store.dispatch(
        registerUser({
          email: "jestUser@email.com",
          username: "jestUser",
          password: "password",
        })
      );

      const state = store.getState().auth;
      expect(state.loading).toBe(false);
      expect(state.email).toBe("jestUser@email.com");
      expect(state.username).toBe("jestUser");
      expect(state.userId).toBe(99);
      expect(state.token).toBe("2f4dfd");
    });

    test("Should return general error if can't connect", async () => {
      window.fetch = jest.fn().mockReturnValue({
        status: 400,
      });

      await store.dispatch(
        registerUser({
          email: "jestUser@email.com",
          username: "jestUser",
          password: "password",
        })
      );

      const state = store.getState().auth;
      expect(state.error).toBe("Connection error");
      expect(state.loading).toBe(false);
    });

    test("Should return specific error if message sent from server", async () => {
      window.fetch = jest.fn().mockReturnValue({
        status: 400,
        json: () =>
          Promise.resolve({
            error: "username already exists",
          }),
      });

      await store.dispatch(
        registerUser({
          email: "jestUser@email.com",
          username: "jestUser",
          password: "password",
        })
      );

      const state = store.getState().auth;
      expect(state.error).toBe("username already exists");
      expect(state.loading).toBe(false);
    });
  });

  describe("loginUser action", () => {
    test("Should login an existing user", async () => {
      window.fetch = jest.fn().mockReturnValue({
        status: 200,
        json: () =>
          Promise.resolve({
            email: "jestUser@email.com",
            username: "jestUser",
            userId: 99,
            token: "2f4dfd",
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
          }),
      });

      await store.dispatch(
        loginUser({
          email: "jestUser@email.com",
          password: "password",
        })
      );

      const state = store.getState().auth;
      expect(state.loading).toBe(false);
      expect(state.email).toBe("jestUser@email.com");
      expect(state.username).toBe("jestUser");
      expect(state.userId).toBe(99);
      expect(state.token).toBe("2f4dfd");
    });

    test("Should return general error if can't connect", async () => {
      window.fetch = jest.fn().mockReturnValue({
        status: 400,
      });

      await store.dispatch(
        loginUser({
          email: "jestUser@email.com",
          password: "password",
        })
      );

      const state = store.getState().auth;
      expect(state.error).toBe("Connection error");
      expect(state.loading).toBe(false);
    });

    test("Should return specific error if message sent from server", async () => {
      window.fetch = jest.fn().mockReturnValue({
        status: 400,
        json: () =>
          Promise.resolve({
            error: "Incorrect username of password",
          }),
      });

      await store.dispatch(
        loginUser({
          email: "jestUser@email.com",
          password: "password",
        })
      );

      const state = store.getState().auth;
      expect(state.error).toBe("Incorrect username of password");
      expect(state.loading).toBe(false);
    });
  });
});

export {};
