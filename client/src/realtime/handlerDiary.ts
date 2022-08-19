import { diaryActions } from './../app/features/diary/diarySlice';
import { Value } from 'react-quill';
import { store } from '../app/store';

export const loadDiary = (document: Value) => {
  store.dispatch(diaryActions.setOpen(document));
};

export const receiveChanges = (document: Value) => {
  store.dispatch(diaryActions.setDiary(document));
};
