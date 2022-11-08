import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp, googleSignIn } from "../../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await signIn(formValue);
      toast.success("Login Successfully");
      navigate("/");

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await signUp(formValue);
      toast.success("Register successfully, You can login now.");
      navigate("/login");

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/google-sign-in",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await googleSignIn(result);
      toast.success("Google sign in successfully, You can login now.");
      navigate("/");

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    resetError: (state, action) => {
      state.error = "";
    },
    setUser: (state, action) => {
      console.log("set user...");
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      console.log("logout...");
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [loginWithGoogle.pending]: (state, action) => {
      state.loading = true;
    },
    [loginWithGoogle.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [loginWithGoogle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
