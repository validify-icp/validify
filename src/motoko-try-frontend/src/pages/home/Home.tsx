import { useSelector, useDispatch } from "react-redux";

import Navbar from "../../components/molecules/Navbar";

import { processOCR } from "../../store/ocr/action";

import { extractCertificateID } from "../../utils/certificate";

import { images } from "../../constants";

import type { RootState, AppDispatch } from "../../store";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ocrResults = useSelector((state: RootState) => state.ocr.results);
  const loading = useSelector((state: RootState) => state.ocr.loading);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      dispatch(processOCR(Array.from(files)));
    }
  };

  return (
    <div className="w-full h-[9000px] font-dm-sans">
      <div
        className="h-[806px] px-10 pt-3 bg-cover bg-no-repeat bg-[position:10%_200%]"
        style={{
          backgroundImage: `url(${images.hero})`,
        }}
      >
        <Navbar />
        <div className="mt-20 py-10">
          <div className="w-[60%] border-yellow-500 mx-auto">
            <h1 className="text-5xl text-white text-center font-bold">
              Build Trust with Every Certificate, <br /> Ready in Minutes!
            </h1>
          </div>
          <div className="w-[65%] h-[420px] mt-8 px-5 py-5 border border-white/25 bg-white/25 backdrop-blur-sm mx-auto rounded-lg shadow-md">
            <div className="h-full flex flex-col gap-5 items-center justify-center border border-slate-200/20 bg-white rounded-lg px-3 py-3">
              <h2 className="text-3xl font-bold">Drag, Drop, and Done</h2>
              <p className="mt-2 text-xl text-center">
                Drop it like it’s hot 🔥 <br /> Validify tells you if that cert
                is real or cap — in seconds.
              </p>
              <label
                htmlFor="fileInput"
                className="mt-5 px-7 py-2 text-white text-lg font-normal rounded-lg border border-[#a693f5] outline outline-slate-200 bg-linear-to-t from-[#6240ED] to-[#917AF2] shadow-md cursor-pointer"
              >
                Select Certificate File
              </label>
              <input
                id="fileInput"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFiles}
                hidden
              />
              <p className="mt-[-10px] text-xl">or drop file here</p>
            </div>
          </div>
        </div>
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

export default HomePage;
