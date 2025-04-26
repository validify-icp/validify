import { configureStore } from "@reduxjs/toolkit";

import ocrSlice from "./ocr/slice";

const store = configureStore({
  reducer: {
    ocr: ocrSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
