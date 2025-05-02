import { useState } from "react";

import { NavLink } from "react-router-dom";

import Button from "../../components/elements/Button";
import ModalUploadBackground from "../../components/molecules/ModalUploadBackground";

import {
  images,
  backgrounds,
  icons,
  themeOptions,
  signatureOptions,
  logos,
} from "../../constants";
import Input from "../../components/elements/Input";
import SelectInput from "../../components/elements/SelectInput";

const DetailGeneratePage = () => {
  const [showModal, setShowModal] = useState({
    uploadBackground: false,
  });

  const [isTemplateTab, setIsTemplateTab] = useState(true);

  const toggleModal = () => {
    setShowModal({
      ...showModal,
      uploadBackground: !showModal.uploadBackground,
    });
  };
  return (
    <div className="w-full h-[950px] font-dm-sans">
      <ModalUploadBackground
        open={showModal.uploadBackground}
        onClose={toggleModal}
      />
      <div
        className="h-full px-20 pt-3 bg-cover bg-no-repeat bg-[position:10%_10%]"
        style={{
          backgroundImage: `url(${backgrounds.background})`,
        }}
      >
        <div className="mt-5">
          <p className="text-black font-medium text-base">
            <NavLink to="/generate" className="text-[#535760]">
              Generate {">"}
            </NavLink>{" "}
            Class A Certificate of Completion
          </p>
          <div className="mt-5 flex items-start gap-2">
            <NavLink to={"/generate"}>
              <img src={icons.arrow_left} width={40} alt="icon arrow left" />
            </NavLink>
            <div>
              <h3 className="text-3xl font-medium">
                Class A Certificate of Completion
              </h3>
              <div className="mt-3 flex items-center gap-2">
                <span className="px-4 py-1 text-xs border border-[#babec1] bg-[#EBF0F4] text-[#3D3F40] font-medium font-inter rounded-sm">
                  Draft
                </span>
                <p className="text-[#535760] text-sm">
                  Created at 10 Oct 2022 18:30
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-full ${
            isTemplateTab ? "h-[750px]" : "h-[700px]"
          } mt-5 py-10 border border-white/25 bg-white mx-auto rounded-lg`}
        >
          <div className="w-full flex items-center justify-center gap-2 border-b border-slate-300 font-inter">
            <div
              className={`px-2 pb-2 flex items-center gap-2 cursor-pointer ${
                isTemplateTab ? "border-b-4 border-[#6240ED]" : ""
              }`}
              onClick={() => setIsTemplateTab(true)}
            >
              <div
                className={`
                w-6 h-6 flex items-center justify-center rounded-full ${
                  isTemplateTab ? "bg-[#6240ED]" : "bg-[#717375]"
                }
                `}
              >
                <span className="text-xs font-bold text-white">1</span>
              </div>
              <p className="font-semibold">Template Setting</p>
            </div>
            <div
              className={`px-2 pb-2 flex items-center gap-2 cursor-pointer ${
                !isTemplateTab ? "border-b-4 border-[#6240ED]" : ""
              }`}
              onClick={() => setIsTemplateTab(false)}
            >
              <div
                className={`
                w-6 h-6 flex items-center justify-center rounded-full ${
                  !isTemplateTab ? "bg-[#6240ED]" : "bg-[#717375]"
                }
                `}
              >
                <span className="text-xs font-bold text-white">2</span>
              </div>
              <p className="font-semibold">Data Completion</p>
            </div>
          </div>
          {isTemplateTab && (
            <div className="w-full h-full flex">
              <div className="w-3/4 h-full px-8 py-8">
                <div className="w-full flex items-center justify-between">
                  <p className="text-xl font-medium">Preview Sertifikat</p>
                  <button className="border-2 border-[#6240ED] px-6 py-2 rounded-lg text-sm text-[#6240ED] font-semibold">
                    Refresh
                  </button>
                </div>
                <hr className="mt-3 border-none bg-[#D8DCDF] h-[2px]" />
                <div className="mt-5 w-full flex h-[89%] bg-[#EFF1F3] rounded-md">
                  <div className="w-[60%] mx-auto px-3 py-5 flex flex-col gap-2">
                    <p className="font-inter text-sm w-[130px] bg-[#d8dcdf] font-semibold text-center rounded-lg px-2 py-2  ">
                      Halaman Depan
                    </p>
                    <div
                      className="w-[604px] h-[423px] pt-9 pb-9 pl-9 pr-8 bg-cover"
                      style={{
                        backgroundImage: `url(${images.template_sertif_1})`,
                      }}
                    >
                      <div className="w-full h-full p-5 flex flex-col font-abeezee">
                        <div className="w-full flex items-center justify-between">
                          <p className="text-sm">
                            Sertifikat ID : 0098/123940-
                          </p>
                        </div>
                        <div className="mt-2 w-full h-[200px] px-8 py-4 flex flex-col gap-3 items-center text-center">
                          <div className="flex flex-col gap-2 items-center justify-between">
                            <p className="text-2xl font-inter">
                              Sertifikat Kelulusan
                            </p>
                            <p className="text-xs">
                              Sertifikat ini dengan bangga diberikan pada :
                            </p>
                            <p className="text-2xl">Nisrina Thifal K</p>
                          </div>
                          <hr className="w-full border-none bg-[#4256AC] h-[1px]" />
                          <p className="text-sm font-inter">
                            Sudah berhasil menyelesaikan semua materi kelas
                            “Contoh Nama Kelas” dengan nilai Memuaskan
                          </p>
                        </div>
                        <div className="mt-2 w-full h-[70px] flex items-center gap-2">
                          <div className="w-1/3 h-full">
                            <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                              <p className="text-xs">Mindi Fransiskamaya</p>
                              <hr className="w-full border-none bg-[#E0E0E0] h-[1px]" />
                              <p className="text-xs font-inter">
                                Penyelenggara
                              </p>
                            </div>
                          </div>
                          <div className="w-1/3 h-full">
                            <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                              <img
                                className="w-[70%]"
                                src={logos.logo_template_certificate}
                                alt="logo template certificate"
                              />
                              <p className="text-xs text-[#4E5BA6]">
                                www.schoolofmichael.com
                              </p>
                            </div>
                          </div>
                          <div className="w-1/3 h-full">
                            <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                              <p className="text-xs">Mindi Fransiskamaya</p>
                              <hr className="w-full border-none bg-[#E0E0E0] h-[1px]" />
                              <p className="text-xs font-inter">Tanggal</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4 pt-8 px-4 border-l-3 border-slate-200 overflow-y-auto">
                <p className="text-xl font-semibold">Settings</p>
                <hr className="mt-5 border-none bg-[#D8DCDF] h-[2px]" />
                <p className="mt-5 text-base font-medium">Front Page</p>
                <div className="mt-2">
                  <label htmlFor="" className="text-sm font-semibold">
                    Choose Template
                  </label>
                  <SelectInput
                    className="mt-2"
                    options={themeOptions}
                    placeholder="-- choose template --"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold">
                    Or Upload Your Own Background
                  </p>
                  <label
                    className="flex items-center justify-center gap-2 text-center mt-4 w-full border-2 border-[#6240ED] px-6 py-3 rounded-lg text-xs text-[#6240ED] font-semibold cursor-pointer hover:bg-[#6240ED] hover:text-white"
                    onClick={toggleModal}
                  >
                    <img
                      src={icons.size_guideline_purple}
                      alt="size guideline purple"
                    />
                    <span>Upload Background</span>
                  </label>
                </div>
                <hr className="mt-5 border-none bg-[#D8DCDF] h-[2px]" />
                <div className="mt-4">
                  <p className="text-base font-semibold">Certificate Detail</p>
                  <div className="mt-2 flex items-center justify-between border-2 border-slate-200 px-3 py-3 rounded-lg cursor-pointer hover:border-slate-300">
                    <div>
                      <p className="font-semibold text-sm">Certificate Title</p>
                      <p className="mt-2 text-[#717375] font-inter text-xs">
                        judul_sertifikat
                      </p>
                    </div>
                    <img src={icons.edit} alt="edit" width={20} />
                  </div>
                  <div className="mt-2 flex items-center justify-between border-2 border-slate-200 px-3 py-3 rounded-lg cursor-pointer hover:border-slate-300">
                    <div>
                      <p className="font-semibold text-sm">Lable</p>
                      <p className="mt-2 text-[#717375] font-inter text-xs">
                        judul_sertifikat
                      </p>
                    </div>
                    <img src={icons.edit} alt="edit" width={20} />
                  </div>
                  <div className="mt-2 flex items-center justify-between border-2 border-slate-200 px-3 py-3 rounded-lg cursor-pointer hover:border-slate-300">
                    <div>
                      <p className="font-semibold text-sm">Description</p>
                      <p className="mt-2 text-[#717375] font-inter text-xs">
                        judul_sertifikat
                      </p>
                    </div>
                    <img src={icons.edit} alt="edit" width={20} />
                  </div>
                  <div className="mt-2 px-3 py-3 flex items-center justify-between rounded-md bg-[#EBF0F4] cursor-not-allowed">
                    <p className="text-sm font-medium">Partisipan Name</p>
                    <div className="flex items-center justify-center bg-[#0D804A] p-1 rounded-2xl">
                      <span className="font-semibold text-[10px] text-white">
                        CSV
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 px-3 py-3 flex items-center justify-between rounded-md bg-[#EBF0F4] cursor-not-allowed">
                    <p className="text-sm font-medium">Role</p>
                    <div className="flex items-center justify-center bg-[#0D804A] p-1 rounded-2xl">
                      <span className="font-semibold text-[10px] text-white">
                        CSV
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 px-3 py-3 flex items-center justify-between rounded-md bg-[#EBF0F4] cursor-not-allowed">
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center justify-center bg-[#0D804A] p-1 rounded-2xl">
                      <span className="font-semibold text-[10px] text-white">
                        CSV
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 px-3 py-3 flex items-center justify-between rounded-md bg-[#EBF0F4] cursor-not-allowed">
                    <p className="text-sm font-medium">Date</p>
                    <div className="flex items-center justify-center bg-[#0D804A] p-1 rounded-2xl">
                      <span className="font-semibold text-[10px] text-white">
                        CSV
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="mt-3 border-none bg-[#D8DCDF] h-[2px]" />
                <div className="mt-4">
                  <p className="text-sm font-semibold">Logo Upload</p>
                  <label className="flex items-center justify-center gap-2 text-center mt-4 w-full border-2 border-[#6240ED] px-6 py-3 rounded-lg text-xs text-[#6240ED] font-semibold cursor-pointer hover:bg-[#6240ED] hover:text-white">
                    <img
                      src={icons.size_guideline_purple}
                      alt="size guideline purple"
                    />
                    <span>Upload Logo</span>
                  </label>
                </div>
                <hr className="mt-3 border-none bg-[#D8DCDF] h-[2px]" />
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Signature?</h3>
                    <input type="radio" name="signature" id="signature" />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="text-sm font-semibold">
                      Amount of Signature Display
                    </label>
                    <SelectInput
                      className="mt-2"
                      options={signatureOptions}
                      placeholder="-- choose amount signature --"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Signature 1</p>
                  <div className="mt-2">
                    <label htmlFor="" className="text-xs font-semibold">
                      Name
                    </label>
                    <Input placeholder="Name" className="mt-2 h-10 text-xs" />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="text-xs font-semibold">
                      Position
                    </label>
                    <Input
                      placeholder="Position"
                      className="mt-2 h-10 text-xs"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-semibold">Upload Signature 1</p>
                    <label className="flex items-center justify-center gap-2 text-center mt-4 w-full border-2 border-[#6240ED] px-6 py-3 rounded-lg text-xs text-[#6240ED] font-semibold cursor-pointer hover:bg-[#6240ED] hover:text-white">
                      <img
                        src={icons.size_guideline_purple}
                        alt="size guideline purple"
                      />
                      <span>Upload Signature</span>
                    </label>
                  </div>
                </div>
                <hr className="mt-5 mb-5 border-none bg-[#D8DCDF] h-[2px]" />
              </div>
            </div>
          )}
          {!isTemplateTab && (
            <div className="w-full h-full flex flex-col gap-3 p-8">
              <p className="text-xl font-medium">Data Source</p>
              <div className="w-full h-full flex items-center gap-7">
                <div className="w-1/2 h-full flex flex-col gap-8 rounded-lg">
                  <div className="w-full h-1/2 p-8 border-2 border-slate-200 rounded-lg bg-[#f7f9fc]">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <span className="w-[60px] text-sm p-1 text-center border-2 border-[#f8d3d8] bg-[#FCE9EC] font-semibold text-[#6240ED] rounded-md">
                            {" "}
                            Step 1
                          </span>
                          <p className="text-lg font-medium">
                            Download Template CSV
                          </p>
                        </div>
                        <img
                          src={icons.question_mark}
                          width={18}
                          alt="icon question mark"
                        />
                      </div>
                    </div>
                    <hr className="mt-3 border-none bg-[#D8DCDF] h-[2px]" />
                    <div className="p-3 w-full flex items-center justify-between mt-5 border-2 border-slate-200 rounded-lg bg-white cursor-pointer hover:border-slate-300">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#43936c] p-5 rounded-md">
                          <span className="font-semibold text-sm text-white">
                            CSV
                          </span>
                        </div>
                        <p className="font-semibold">
                          Template_Certificate_Data
                        </p>
                      </div>
                      <img src={icons.download} alt="icon_download" />
                    </div>
                  </div>
                  <div className="w-full h-1/2 p-7 border-2 border-slate-200 rounded-lg bg-[#f7f9fc]">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <span className="w-[60px] text-sm p-1 text-center border-2 border-[#f8d3d8] bg-[#FCE9EC] font-semibold text-[#6240ED] rounded-md">
                            {" "}
                            Step 2
                          </span>
                          <p className="text-lg font-medium">
                            Complete the Data
                          </p>
                        </div>
                        <img
                          src={icons.question_mark}
                          width={18}
                          alt="icon question mark"
                        />
                      </div>
                    </div>
                    <hr className="mt-3 border-none bg-[#D8DCDF] h-[2px]" />
                    <div className="w-full flex items-center justify-between mt-5">
                      <p className="text-[#5D5F60]">
                        Insert participant data into the CSV template according
                        to the provided columns.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 h-full px-8 py-8 border-2 border-slate-200 rounded-lg bg-[#f7f9fc]">
                  <div className="w-full h-full flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <span className="w-[60px] text-sm p-1 text-center border-2 border-[#f8d3d8] bg-[#FCE9EC] font-semibold text-[#6240ED] rounded-md">
                          {" "}
                          Step 3
                        </span>
                        <p className="text-lg font-medium">
                          Re-Upload with Completed CSV
                        </p>
                      </div>
                      <img
                        src={icons.question_mark}
                        width={18}
                        alt="icon question mark"
                      />
                    </div>
                    <div className="w-full h-full flex items-center justify-center mt-2 border-2 border-dashed border-slate-200 rounded-md bg-white cursor-pointer hover:border-slate-300 hover:bg-[#fdfeff]">
                      <div className="w-[70%] h-1/2 flex flex-col items-center justify-center gap-3">
                        <img src={icons.upload} alt="icon upload" />
                        <p className="text-center text-base font-semibold">
                          Upload Completed CSV
                        </p>
                        <p className="text-center text-sm text-[#5D5F60]">
                          Drag and drop the completed CSV template here, or{" "}
                        </p>
                        <Button className="mt-2" label="Choose File" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailGeneratePage;
