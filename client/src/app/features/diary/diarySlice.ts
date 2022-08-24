import { Value } from 'react-quill';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiaryState {
  open: boolean;
  document: Value | undefined;
}

const initialState: DiaryState = {
  open: false,
  document: undefined,
};

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<Value>) {
      state.open = true;
    },
    setDiary(state, action: PayloadAction<Value>) {
      state.document = action.payload;
    },
    setClose(state) {
      state.open = false;
      state.document = undefined;
    },
    setSaveDocument(state, action: PayloadAction<Value>) {},
  },
});

export const diaryActions = diarySlice.actions;
export const diaryReducer = diarySlice.reducer;
