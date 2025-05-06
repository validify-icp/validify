import { AppDispatch } from "../index";

import { setTitle, setDescription, setLabel, setTemplate } from "./slice";

export const updateCertificate =
  (data: {
    title: string;
    description: string;
    label: string;
    template: string;
  }) =>
  (dispatch: AppDispatch) => {
    dispatch(setTitle(data.title));
    dispatch(setDescription(data.description));
    dispatch(setLabel(data.label));
    dispatch(setTemplate(data.template));
  };
