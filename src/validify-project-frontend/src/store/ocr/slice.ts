import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OCRResult {
  filename: string;
  text: string;
  progress: number;
}

interface OCRState {
  results: OCRResult[];
  loading: boolean;
}

const initialState: OCRState = {
  results: [],
  loading: false,
};

const ocrSlice = createSlice({
  name: "ocr",
  initialState,
  reducers: {
    startOCR(state) {
      state.loading = true;
    },
    addResult(state, action: PayloadAction<OCRResult>) {
      state.results.push(action.payload);
    },
    finishOCR(state) {
      state.loading = false;
    },
    clearOCR(state) {
      state.results = [];
      state.loading = false;
    },
  },
});

export const { startOCR, addResult, finishOCR, clearOCR } = ocrSlice.actions;
export default ocrSlice.reducer;
