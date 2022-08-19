import { diaryActions } from './diarySlice';
import { Value } from 'react-quill';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

function* Diary(action: PayloadAction<Value>) {
  try {
    yield put(diaryActions.setDiary(action.payload));
  } catch (error) {
    yield put(diaryActions.setClose());
  }
}

export default function* diarySaga() {
  yield takeLatest(diaryActions.setOpen.type, Diary);
}
