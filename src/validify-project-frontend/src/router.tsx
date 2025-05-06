import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/home/Home";
import GeneratePage from "./pages/generate/Generate";
import DetailGeneratePage from "./pages/generate/Detail";
import ResultGeneratePage from "./pages/generate/Result";
import RegisterPage from "./pages/register/Register";
import ValidatePage from "./pages/validate/Validate";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "generate",
        children: [
          { index: true, element: <GeneratePage /> },
          {
            path: ":id",
            element: <DetailGeneratePage />,
          },
          {
            path: ":id/result",
            element: <ResultGeneratePage />,
          },
        ],
      },
      {
        path: "validate",
        children: [{ index: true, element: <ValidatePage /> }],
      },
      {
        path: "register",
        children: [{ index: true, element: <RegisterPage /> }],
      },
    ],
  },
]);
