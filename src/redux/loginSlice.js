import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../authentication/firebase";

export const authenticateUser = createAsyncThunk(
  "login/authenticateUser",
  async ({ email, password }) => {
    const result = await auth.signInWithEmailAndPassword(email, password);
    return result.user;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loginStatus: null,
  },
  extraReducers: {
    [authenticateUser.pending]: (state, action) => {
      state.loginStatus = "loading";
    },
    [authenticateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loginStatus = "success";

    },
    [authenticateUser.rejected]: (state, action) => {
      state.loginStatus = "failed";
    },
  },
  reducers: {
    userSession: (state, action) => {
      state.user = action.payload.user;
      state.loginStatus = action.payload.status;
    },
    userLogout: (state, action) => {
      state.user = null;
      state.loginStatus = null;
    },
  },
});

export const { userSession, userLogout } = loginSlice.actions;

export default loginSlice.reducer;
