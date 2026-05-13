import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, rememberMe }, thunkAPI) => {
    try {
      const response = await api.post("/user/login", { email, password });
      const token = response.data.body.token;

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      const profileResponse = await api.post(
        "/user/profile",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      return {
        user: profileResponse.data.body,
        token,
      };
    } catch {
      return thunkAPI.rejectWithValue("Identifiants incorrects");
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ firstName, lastName }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const response = await api.put(
        "/user/profile",
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      return response.data.body;
    } catch {
      return thunkAPI.rejectWithValue(
        "Erreur lors de la mise à jour du profil.",
      );
    }
  },
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        return thunkAPI.rejectWithValue("Aucun token trouvé.");
      }

      const response = await api.post(
        "/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return {
        user: response.data.body,
        token,
      };
    } catch {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      return thunkAPI.rejectWithValue("Session expirée.");
    }
  },
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
