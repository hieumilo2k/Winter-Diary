import { UserInformation } from './../../../models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  loading: boolean;
  user: UserInformation;
  success: boolean;
  error: boolean;
}

const initialState: UserState = {
  loading: false,
  user: {
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
    diaries: [],
  },
  success: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserStart(state) {
      state.loading = true;
    },

    getUserSuccess(state, action: PayloadAction<UserInformation>) {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
      state.error = false;
    },

    getUserFailed(state) {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
