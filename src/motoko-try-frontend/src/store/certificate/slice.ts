import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { images } from "../../constants";

interface DataParticipants {
  [key: string]: string | number;
}

interface CertificateState {
  title: string;
  description: string;
  label: string;
  template: keyof typeof images;
  custom_template: string | null;
  data_participants: DataParticipants[];
  signature_name_1: string;
  signature_position_1: string;
  signature_name_2: string;
  signature_position_2: string;
  signature_amount: number;
}

const initialState: CertificateState = {
  title: "",
  description: "",
  label: "",
  template: "template_sertif_1",
  custom_template: null,
  data_participants: [],
  signature_name_1: "",
  signature_position_1: "",
  signature_name_2: "",
  signature_position_2: "",
  signature_amount: 1,
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
    setCustomTemplate: (state, action) => {
      state.custom_template = action.payload;
    },
    setDataParticipants: (state, action) => {
      state.data_participants = action.payload;
    },
    setSignatureField(
      state,
      action: PayloadAction<{
        field:
          | "signature_name_1"
          | "signature_position_1"
          | "signature_name_2"
          | "signature_position_2";
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setSignatureAmount: (state, action) => {
      state.signature_amount = action.payload;
    },
  },
});

export const {
  setTitle,
  setDescription,
  setLabel,
  setTemplate,
  setCustomTemplate,
  setDataParticipants,
  setSignatureField,
  setSignatureAmount,
} = certificateSlice.actions;
export default certificateSlice.reducer;
