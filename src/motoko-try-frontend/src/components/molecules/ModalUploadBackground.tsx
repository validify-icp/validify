import { useNavigate } from "react-router-dom";

import Button from "../elements/Button";
import BaseModal from "../elements/BaseModal";

import { icons, images } from "../../constants";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalUploadBackground = ({ open, onClose }: ModalProps) => {
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    navigate(href);
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
        <div className="mt-5 w-full">
          <div className="w-full h-[150px] flex flex-col gap-2 justify-center items-center border-2 border-slate-200 border-dashed rounded-lg hover:border-slate-300 hover:bg-[#fdfeff]">
            <img src={icons.drop} alt="drop icon" width={55} />
            <p className="font-bold text-sm">
              Drag and drop your image here or{" "}
              <span className="text-[#6240ED]">select a file manually</span>
            </p>
            <p className="text-xs text-[#717375]">
              Required size: 800 × 347 pixell with accepted formats: JPG / PNG
            </p>
          </div>
        </div>
        <hr className="mt-5 w-full border border-slate-200 bg-[#D8DCDF]" />
        <div className="mt-3 w-full flex items-center justify-end gap-5">
          <p
            className="font-inter font-bold text-[#6240ED] text-sm cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </p>
          <Button
            className="text-xs"
            onClick={() => handleNavigate("/generate/1")}
          >
            Upload
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalUploadBackground;
