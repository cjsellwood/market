import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  registerUser,
  loginUser,
  loadStoredUser,
} from "../store/authSlice";

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
    localStorage.clear();
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

      expect(localStorage.getItem("userId")).toBe("99");
      expect(localStorage.getItem("token")).toBe("2f4dfd");
      expect(localStorage.getItem("expires")).not.toBeNull();
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

      expect(localStorage.getItem("userId")).toBe("99");
      expect(localStorage.getItem("token")).toBe("2f4dfd");
      expect(localStorage.getItem("expires")).not.toBeNull();
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

  describe("loadStoredUser action", () => {
    test("Gets a stored user and stores data in state", () => {
      localStorage.setItem("userId", "99");
      localStorage.setItem("token", "2f4dfd");
      localStorage.setItem(
        "expires",
        (Date.now() + 1000 * 60 * 60 * 24 * 7).toString()
      );

      store.dispatch(loadStoredUser());

      const state = store.getState().auth;
      expect(state.userId).toBe(99);
      expect(state.token).toBe("2f4dfd");
      expect(state.expires).not.toBeNull();
    });

    test("Doesn't store user if token expired", () => {
      localStorage.setItem("userId", "99");
      localStorage.setItem("token", "2f4dfd");
      localStorage.setItem(
        "expires",
        (Date.now() - 1000 * 60 * 60 * 24 * 2).toString()
      );

      store.dispatch(loadStoredUser());

      const state = store.getState().auth;
      expect(state.userId).toBeNull();
      expect(state.token).toBeNull();
      expect(state.expires).toBeNull();
    });

    test("Doesn't store user if no userId stored", () => {
      localStorage.setItem("token", "2f4dfd");
      localStorage.setItem(
        "expires",
        (Date.now() + 1000 * 60 * 60 * 24 * 7).toString()
      );

      store.dispatch(loadStoredUser());

      const state = store.getState().auth;
      expect(state.userId).toBeNull();
      expect(state.token).toBeNull();
      expect(state.expires).toBeNull();
    });
  });
});
