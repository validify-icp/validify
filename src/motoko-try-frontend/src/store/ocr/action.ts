import Tesseract from "tesseract.js";
import { AppDispatch } from "../index";

import { addResult, finishOCR, startOCR } from "./slice";

export const processOCR = (files: File[]) => async (dispatch: AppDispatch) => {
  dispatch(startOCR());

  for (const file of files) {
    const { data } = await Tesseract.recognize(file, "eng");

    dispatch(
      addResult({
        filename: file.name,
        text: data.text,
        progress: 100,
      })
    );
  }

  dispatch(finishOCR());
};
