import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import userApi from '../../../api/userApi';
import { userActions } from './userSlice';

function* getCurrentUserSaga(action: PayloadAction<string>): any {
  try {
    const { data } = yield call(userApi.getCurrentUser);
    if (data._id) {
      const user = {
        id: data._id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        diaries: data.diaries,
      };
      yield put(userActions.getUserSuccess(user));
    } else {
      yield put(userActions.getUserFailed());
    }
  } catch (error) {
    yield put(userActions.getUserFailed());
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.getUserStart.type, getCurrentUserSaga);
}
