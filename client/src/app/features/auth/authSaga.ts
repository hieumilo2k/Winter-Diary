import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';
import { authActions } from './authSlice';

function* loginSaga(action: PayloadAction<string>): any {
  try {
    const data = action.payload;
    console.log(data);
    if (data) {
      yield put(authActions.loginSuccess(true));
      window.location.href = '/';
    } else {
      yield put(authActions.loginFailed());
    }
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.loginStart.type, loginSaga);
}
