import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  normalLogin,
  normalSignup,
  type AuthReturnType,
  type LoginType,
  type RegisterType,
  type UserType,
} from "../../fetchLib/authapi";

type AuthStatus = "idle" | "checking" | "loading" | "authenticated" | "error";

type AuthState = {
  user: UserType | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;
  status: AuthStatus;
  error: string | null;
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") ?? "null"),
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  tokenType: localStorage.getItem("tokenType"),
  status: localStorage.getItem("accessToken") ? "checking" : "idle",
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (signupData: RegisterType): Promise<AuthReturnType> => {
    return normalSignup(signupData);
  },
);

export const checkCurrentUser = createAsyncThunk(
  "auth/checkCurrentUser",
  async (): Promise<UserType> => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token");
    }

    return getCurrentUser(accessToken);
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (loginData: LoginType): Promise<AuthReturnType> => {
    return normalLogin(loginData);
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })

      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.tokenType = action.payload.tokenType;
        state.status = "authenticated";

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("tokenType", action.payload.tokenType);
      })

      .addCase(register.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Registration failed";
      })

      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.tokenType = action.payload.tokenType;
        state.status = "authenticated";

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("tokenType", action.payload.tokenType);
      })

      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Login failed";
      })

      .addCase(checkCurrentUser.pending, (state) => {
        state.status = "checking";
        state.error = null;
      })

      .addCase(checkCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = localStorage.getItem("accessToken");
        state.refreshToken = localStorage.getItem("refreshToken");
        state.tokenType = localStorage.getItem("tokenType");
        state.status = "authenticated";
      })

      .addCase(checkCurrentUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenType = null;
        state.status = "idle";
        state.error = null;

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenType");
      });
  },
});

export default authSlice.reducer;
