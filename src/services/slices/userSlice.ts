import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { access } from 'fs';

export type TUserState = {
  user: TUser | null;
  error: string | null;
  loaded: boolean;
};

const userInitialState: TUserState = {
  user: null,
  error: null,
  loaded: false
};

const saveTokens = (data: { refreshToken: string; accessToken: string }) => {
  localStorage.setItem('refreshToken', data.refreshToken);
  setCookie('accessToken', data.accessToken);
};

export const getUserInfo = createAsyncThunk('user/getInfo', getUserApi);
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);
export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);
export const updateUserData = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);
export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    userAuthChecked: (state) => {
      state.loaded = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loaded = true;
        state.user = null;
        state.error = action.error.message!;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loaded = true;
        state.error = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loaded = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loaded = true;
        state.user = null;
        state.error = action.error.message!;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loaded = true;
        state.error = null;
        saveTokens(action.payload);
      })
      .addCase(registerUser.pending, (state) => {
        state.loaded = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loaded = true;
        state.user = null;
        state.error = action.error.message!;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loaded = true;
        state.error = null;
        saveTokens(action.payload);
      })
      .addCase(updateUserData.pending, (state) => {
        state.loaded = false;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loaded = true;
        state.user = null;
        state.error = action.error.message!;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loaded = true;
        state.error = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loaded = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loaded = true;
        state.error = action.error.message!;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loaded = true;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      });
  }
});
