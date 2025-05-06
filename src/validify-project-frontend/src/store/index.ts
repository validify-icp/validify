import { configureStore } from "@reduxjs/toolkit";

import ocrSlice from "./ocr/slice";
import certificateSlice from "./certificate/slice";

const store = configureStore({
  reducer: {
    ocr: ocrSlice,
    certificate: certificateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
