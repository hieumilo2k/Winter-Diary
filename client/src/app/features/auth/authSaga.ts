import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import authApi from '../../../api/authApi';
import { Login } from '../../../models';
import { authActions } from './authSlice';

function* loginSaga(action: PayloadAction<Login>): any {
  try {
    const res = yield call(authApi.signIn, action.payload);
    console.log('saga', res);
    if (res && res.status === 200) {
      yield put(authActions.loginSuccess());
      localStorage.setItem('firstLogin', 'true');
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
