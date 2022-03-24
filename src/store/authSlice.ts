import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateError } from "./productThunks";

interface AuthState {
  loading: boolean;
  username: string | null;
  email: string | null;
  token: string | null;
  expires: number | null;
  userId: number | null;
  error: string | null;
}

export const initialState: AuthState = {
  loading: false,
  username: null,
  email: null,
  token: null,
  expires: null,
  userId: null,
  error: null,
};

interface RegisterReturn {
  username: string;
  email: string;
  userId: number;
  token: string;
  expires: number;
}

interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: RegisterInput, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
        }),
      });

      // If an error return error message
      if (res.status !== 200) {
        throw new Error(await generateError(res));
      }

      const data = await res.json();
      return data;
    } catch (error) {
      const newError = error as Error;
      return rejectWithValue(newError.message);
    }
  }
);

interface LoginInput {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: LoginInput, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
        }),
      });

      // If an error return error message
      if (res.status !== 200) {
        throw new Error(await generateError(res));
      }

      const data = await res.json();
      return data;
    } catch (error) {
      const newError = error as Error;
      return rejectWithValue(newError.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadStoredUser: (state) => {
      const storedUserId = localStorage.getItem("userId");
      const storedToken = localStorage.getItem("token");
      const storedExpires = localStorage.getItem("expires");

      if (!storedExpires || !storedToken || !storedUserId) {
        return;
      }

      // Check if token is expired
      const expires = Number(storedExpires);
      if (expires < Date.now()) {
        return;
      }

      state.expires = expires;
      state.token = storedToken;
      state.userId = Number(storedUserId);
    },
    logOutUser: (state) => {
      state.expires = null;
      state.token = null;
      state.userId = null;

      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("expires");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterReturn>) => {
          state.loading = false;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.userId = action.payload.userId;
          state.token = action.payload.token;
          state.expires = action.payload.expires;

          localStorage.setItem("userId", action.payload.userId.toString());
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("expires", action.payload.expires.toString());
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<RegisterReturn>) => {
          state.loading = false;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.userId = action.payload.userId;
          state.token = action.payload.token;
          state.expires = action.payload.expires;

          localStorage.setItem("userId", action.payload.userId.toString());
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("expires", action.payload.expires.toString());
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loadStoredUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
