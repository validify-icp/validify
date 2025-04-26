import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { processOCR } from "./store/ocr/action";
import type { RootState, AppDispatch } from "./store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ocrResults = useSelector((state: RootState) => state.ocr.results);
  const loading = useSelector((state: RootState) => state.ocr.loading);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      dispatch(processOCR(Array.from(files)));
    }
  };

  const extractCertificateID = (text: string): string | null => {
    const match = text.match(/Sertifikat ID\s*:\s*([0-9/]+-)/);

    console.log(match);
    return match ? match[1] : null;
  };

  return (
    <div className="w-1/3 border-2 border-slate-50">
      <div>
        <h1>Upload file</h1>
        <input type="file" multiple accept="image/*" onChange={handleFiles} />
        {loading && <p className="text-blue-600">Processing OCR...</p>}

        <div className="space-y-4">
          {ocrResults.map((result, index) => (
            <div key={index} className="p-2 border rounded">
              <h2 className="font-semibold">{result.filename}</h2>
              <p className="text-sm text-gray-600">
                Progress: {result.progress}%
              </p>
              <pre className="whitespace-pre-wrap text-sm mt-2 bg-gray-100 p-2 rounded">
                ID: {extractCertificateID(result.text)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
