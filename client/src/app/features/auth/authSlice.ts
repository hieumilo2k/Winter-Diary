import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Login } from '../../../models';

interface AuthState {
  isLogged: boolean;
  loading: boolean;
  success: boolean;
  error: boolean;
}

const initialState: AuthState = {
  isLogged: false,
  loading: false,
  success: false,
  error: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<boolean>) {
      state.loading = false;
      state.isLogged = action.payload;
      state.success = true;
    },
    loginFailed(state) {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
    logout(state) {
      state.success = false;
      state.error = false;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
