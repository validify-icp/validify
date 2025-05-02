import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { images } from "../../constants";

interface CertificateState {
  title: string;
  description: string;
  label: string;
  template: keyof typeof images;
}

const initialState: CertificateState = {
  title: "",
  description: "",
  label: "",
  template: "template_sertif_1",
};

const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setLabel(state, action: PayloadAction<string>) {
      state.label = action.payload;
    },
    setTemplate: (state, action) => {
      state.template = action.payload;
    },
  },
});

export const { setTitle, setDescription, setLabel, setTemplate } =
  certificateSlice.actions;
export default certificateSlice.reducer;
