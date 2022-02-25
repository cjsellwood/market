import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        try {
          const data = await res.json();
          throw new Error(data.error);
        } catch (error) {
          const newError = error as Error;

          // Return error message from server
          if (newError.message !== "res.json is not a function") {
            throw new Error(newError.message);
          }

          // Return general error
          throw new Error("Connection error");
        }
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
  reducers: {},
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
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
