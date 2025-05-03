import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import Button from "../elements/Button";
import BaseModal from "../elements/BaseModal";

import { icons, images } from "../../constants";

import { setCustomTemplate } from "../../store/certificate/slice";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalUploadBackground = ({ open, onClose }: ModalProps) => {
  const [urlFile, setUrlFile] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (urlFile) {
        URL.revokeObjectURL(urlFile);
      }
    };
  }, [urlFile]);

  const handleUpload = () => {
    dispatch(setCustomTemplate(urlFile));
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setUrlFile((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return newUrl;
      });
    }
  };

  return (
    <BaseModal open={open}>
      <div className="fixed w-[700px] h-[680px] px-8 py-8 top-[5%] left-[25%] flex flex-col items-center rounded-lg bg-white">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl font-semibold">Upload Background</h1>
          <span
            className="cursor-pointer hover:bg-[#eae9e9] hover:rounded-full p-2"
            onClick={onClose}
          >
            <img src={icons.close} width={28} alt="icon close" />
          </span>
        </div>
        <div className="mt-5 w-full">
          <div className="w-full h-[300px] flex items-start gap-2">
            <div className="border-1 border-slate-200 w-[35%] h-full p-5 rounded-md">
              <div>
                <p className="flex items-center gap-2">
                  <img
                    src={icons.size_guideline}
                    alt="icon size guideline"
                    width={20}
                  />{" "}
                  <span className="font-semibold text-[#3D3F40] text-xs">
                    Size Guideline
                  </span>
                </p>
                <ul className="mt-2 text-xs list-disc list-inside text-[#3D3F40]">
                  <li>
                    Paper Size: A5 Landscape, 2480 × 1748 pixels at 300 DPI
                  </li>
                  <li>
                    Margins:
                    <ul className="list-disc list-inside px-5 text-xs">
                      <li>Top: 400 px</li>
                      <li>Bottom: 1200 px</li>
                      <li>Right: 600 px</li>
                      <li>Left: 600 px</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="mt-2">
                <p className="flex items-center gap-2">
                  <img
                    src={icons.size_guideline}
                    alt="icon size guideline"
                    width={20}
                  />{" "}
                  <span className="font-semibold text-[#3D3F40] text-xs">
                    Best Practice
                  </span>
                </p>
                <ul className="mt-2 text-xs list-disc list-inside text-[#3D3F40]">
                  <li>Including Logo</li>
                  <li>Put attention to safe place</li>
                </ul>
              </div>
            </div>
            <div className="border border-slate-300 w-[65%] h-full flex justify-center items-center rounded-md bg-[#e2e9f1]">
              <img
                className="w-[90%]"
                src={images.template_guideline}
                alt="template guideline"
              />
            </div>
          </div>
        </div>
        <hr className="mt-5 w-full border border-slate-200 bg-[#D8DCDF]" />
        {!urlFile && (
          <div className="mt-5 w-full">
            <label
              htmlFor="file"
              className="w-full h-[150px] flex flex-col gap-2 justify-center items-center border-2 border-slate-200 border-dashed rounded-lg hover:border-slate-300 hover:bg-[#dde0e2]/30 cursor-pointer"
            >
              <img src={icons.drop} alt="drop icon" width={55} />
              <p className="font-bold text-sm">
                Drag and drop your image here or{" "}
                <span className="text-[#6240ED]">select a file manually</span>
              </p>
              <p className="text-xs text-[#717375]">
                Required size: 800 × 347 pixell with accepted formats: JPG / PNG
              </p>
            </label>
            <input
              id="file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
        {urlFile && (
          <>
            <label
              htmlFor="edit-file"
              className="w-full relative flex justify-center items-center bg-[#808080] cursor-pointer hover:opacity-80"
            >
              <img
                className="w-[40%] z-0 object-cover opacity-70"
                src={urlFile}
                alt="custom template"
                loading="lazy"
              />

              <p className="absolute top-[40%] left-[43%] z-10 bg-white/10 border-2 border-white px-2 py-1 rounded text-xs text-white shadow">
                Edit Image
              </p>
            </label>
            <input
              id="edit-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        )}
        <hr className="mt-5 w-full border border-slate-200 bg-[#D8DCDF]" />
        <div className="mt-3 w-full flex items-center justify-end gap-5">
          <p
            className="font-inter font-bold text-[#6240ED] text-sm cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </p>
          <Button className="text-xs" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalUploadBackground;
