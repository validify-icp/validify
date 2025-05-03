import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import SelectInput from "../../components/elements/SelectInput";
import ModalUploadBackground from "../../components/molecules/ModalUploadBackground";
import ModalEditor from "../../components/molecules/ModalEditor";
import ModalConfirmGenerate from "../../components/molecules/ModalConfirmGenerate";

import type { RootState } from "../../store";

import {
  images,
  backgrounds,
  icons,
  themeOptions,
  signatureOptions,
  logos,
} from "../../constants";

import {
  setTemplate,
  setDataParticipants,
  setSignatureField,
  setSignatureAmount,
} from "../../store/certificate/slice";

import {
  downloadExcelTemplate,
  hasEmptyFields,
  parseExcelToJson,
} from "../../utils/certificate";

interface CsvUploaded {
  name: string;
  date: Date;
  total: number;
  isEmptyField: boolean;
}

const DetailGeneratePage = () => {
  const [showModal, setShowModal] = useState({
    uploadBackground: false,
    editor: false,
    confirm: false,
  });

  const [titleEditor, setTitleEditor] = useState("");

  const [isTemplateTab, setIsTemplateTab] = useState(true);

  const [amountSignature, setAmountSignature] = useState(1);

  const [signatures, setSignatures] = useState({
    signature_name_1: "",
    signature_position_1: "",
    signature_name_2: "",
    signature_position_2: "",
  });

  const [csvUploaded, setCsvUploaded] = useState<CsvUploaded>({
    name: "",
    date: new Date(),
    total: 0,
    isEmptyField: false,
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { title, description, label, template, custom_template } = useSelector(
    (state: RootState) => state.certificate
  );

  const toggleModalUploadBg = () => {
    setShowModal({
      ...showModal,
      uploadBackground: !showModal.uploadBackground,
    });
  };

  const toggleModalEditor = (title: string): void => {
    setTitleEditor(title);
    setShowModal({
      ...showModal,
      editor: !showModal.editor,
    });
  };

  const toggleModalConfirmGenerate = () => {
    setShowModal({
      ...showModal,
      confirm: !showModal.confirm,
    });
  };

  const handleChangeTemplate = (value: string) => {
    dispatch(setTemplate(value));
  };

  const handleSignatureDisplay = (value: string) => {
    setAmountSignature(parseInt(value));
    dispatch(setSignatureAmount(parseInt(value)));
  };

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  const handleDownloadTemplate = () => {
    const fileUrl = "/template_sertifikat.xlsx";
    downloadExcelTemplate(fileUrl, "template_sertifikat.xlsx");
  };

  const handleSignatures = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "signature-name-1") {
      setSignatures({ ...signatures, signature_name_1: e.target.value });
    } else if (e.target.name === "signature-position-1") {
      setSignatures({ ...signatures, signature_position_1: e.target.value });
    } else if (e.target.name === "signature-name-2") {
      setSignatures({ ...signatures, signature_name_2: e.target.value });
    } else if (e.target.name === "signature-position-2") {
      setSignatures({ ...signatures, signature_position_2: e.target.value });
    }

    const mapNameToField: Record<string, keyof typeof signatures> = {
      "signature-name-1": "signature_name_1",
      "signature-position-1": "signature_position_1",
      "signature-name-2": "signature_name_2",
      "signature-position-2": "signature_position_2",
    };

    const field = mapNameToField[e.target.name];
    if (field) {
      dispatch(setSignatureField({ field, value: e.target.value }));
    }
  };

  const handleCsvUploaded = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await parseExcelToJson(file);

      const validate = hasEmptyFields(data);

      dispatch(setDataParticipants(data));

      setCsvUploaded({
        name: file.name,
        date: new Date(),
        total: data.length,
        isEmptyField: validate,
      });
    } catch (err) {
      console.error("Gagal memproses file Excel:", err);
    }
  };

  return (
    <div className="w-full h-[950px] font-dm-sans">
      <ModalUploadBackground
        open={showModal.uploadBackground}
        onClose={toggleModalUploadBg}
      />
      <ModalEditor
        title={titleEditor}
        open={showModal.editor}
        onClose={() => toggleModalEditor(titleEditor)}
      />
      <ModalConfirmGenerate
        title={titleEditor}
        open={showModal.confirm}
        onClose={toggleModalConfirmGenerate}
      />
      <div
        className="h-[1000px] px-20 pt-3 bg-cover bg-no-repeat bg-[position:10%_10%]"
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
                <span className="px-4 py-1 text-xs border border-[#babec1]/40 bg-[#EBF0F4] text-[#3D3F40] font-medium font-inter rounded-sm">
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
            isTemplateTab ? "h-[750px]" : "h-[750px]"
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
                </div>
                <hr className="mt-3 border-none bg-[#D8DCDF] h-[1px]" />
                <div className="mt-5 w-full flex h-[89%] bg-[#EFF1F3] rounded-md">
                  <div className="w-[60%] mx-auto px-3 py-5 flex flex-col gap-2">
                    <p className="font-inter text-sm w-[130px] bg-[#d8dcdf] font-semibold text-center rounded-lg px-2 py-2  ">
                      Halaman Depan
                    </p>
                    <div
                      className="w-[604px] h-[423px] pt-9 pb-9 pl-9 pr-8 bg-cover"
                      style={{
                        backgroundImage: `url(${
                          custom_template || images[template]
                        })`,
                      }}
                    >
                      <div className="w-full h-full p-5 flex flex-col font-abeezee">
                        <div className="w-full flex items-center justify-between">
                          <p className="text-xs">Sertifikat ID : 0098/123940</p>
                        </div>
                        <div className="mt-2 w-full h-[280px] px-8 py-2 flex flex-col gap-2 items-center text-center">
                          <div className="flex flex-col gap-2 items-center justify-between  ">
                            <p className="text-2xl font-inter">
                              {title || "Judul Sertifikat"}
                            </p>
                            <p className="text-xs">
                              Sertifikat ini dengan bangga diberikan pada :
                            </p>
                            <p className="text-2xl">Nama Peserta</p>
                          </div>
                          <hr className="w-full border-none bg-[#4256AC]/20 h-[1px]" />
                          <p className="text-xs">Sebagai</p>
                          <p className="text-sm">{label || "Label Kegiatan"}</p>
                          <p className="text-sm font-inter">
                            {description ||
                              "Sudah berhasil menyelesaikan semua materi kelas “Contoh Nama Kelas” dengan nilai Memuaskan"}
                          </p>
                        </div>
                        <div
                          className={`mt-2 w-full h-[70px] flex items-center justify-around gap-2`}
                        >
                          <div className="w-1/3 h-full">
                            <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                              <p className="text-xs">
                                {signatures.signature_name_1 ||
                                  "Nama Penyelenggara"}
                              </p>
                              <hr className="w-full border-none bg-[#E0E0E0] h-[1px]" />
                              <p className="text-xs font-inter">
                                {signatures.signature_position_1 ||
                                  "Penyelenggara"}
                              </p>
                            </div>
                          </div>
                          {false && (
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
                          )}
                          {amountSignature > 1 && (
                            <div className="w-1/3 h-full">
                              <div className="w-full h-full flex flex-col justify-center items-center gap-1">
                                <p className="text-xs">
                                  {signatures.signature_name_2 ||
                                    "Nama Penyelenggara"}
                                </p>
                                <hr className="w-full border-none bg-[#E0E0E0] h-[1px]" />
                                <p className="text-xs font-inter">
                                  {signatures.signature_position_2 ||
                                    "Penyelenggara"}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4 pt-8 px-4 border-l-1 border-slate-200 overflow-y-auto">
                <p className="text-xl font-semibold">Settings</p>
                <hr className="mt-5 border-none bg-[#D8DCDF] h-[1px]" />
                <p className="mt-5 text-base font-medium">Front Page</p>
                <div className="mt-2">
                  <label htmlFor="" className="text-sm font-semibold">
                    Choose Template
                  </label>
                  <SelectInput
                    className="mt-2"
                    options={themeOptions}
                    placeholder="-- choose template --"
                    onChange={(e) => handleChangeTemplate(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold">
                    Or Upload Your Own Background
                  </p>
                  {custom_template && (
                    <img src={custom_template} alt="custom template" />
                  )}
                  <label
                    className="flex items-center justify-center gap-2 text-center mt-4 w-full border-1 border-[#6240ED] px-6 py-3 rounded-lg text-xs text-[#6240ED] font-semibold cursor-pointer hover:bg-[#6240ED]/10"
                    onClick={toggleModalUploadBg}
                  >
                    <img
                      src={icons.size_guideline_purple}
                      alt="size guideline purple"
                    />
                    <span>
                      {custom_template
                        ? "Edit Background"
                        : "Upload Background"}
                    </span>
                  </label>
                </div>
                <hr className="mt-5 border-none bg-[#D8DCDF] h-[1px]" />
                <div className="mt-4">
                  <p className="text-base font-semibold">Certificate Detail</p>
                  <div
                    className="mt-2 flex items-center justify-between border-2 border-slate-200 px-3 py-3 rounded-lg cursor-pointer hover:border-slate-300 hover:bg-slate-100"
                    onClick={() => toggleModalEditor("Title Certificate")}
                  >
                    <div>
                      <p className="font-semibold text-sm">Certificate Title</p>
                      <p className="mt-2 text-[#717375] font-inter text-xs">
                        {title || "Title Certificate"}
                      </p>
                    </div>
                    <img src={icons.edit} alt="edit" width={20} />
                  </div>
                  <div
                    className="mt-2 flex items-center justify-between border-2 border-slate-200 px-3 py-3 rounded-lg cursor-pointer hover:border-slate-300 hover:bg-slate-100"
                    onClick={() => toggleModalEditor("Label")}
                  >
                    <div>
                      <p className="font-semibold text-sm">Lable</p>
                      <p className="mt-2 text-[#717375] font-inter text-xs">
                        {label || "Label"}
                      </p>
                    </div>
                    <img src={icons.edit} alt="edit" width={20} />
                  </div>
                  <div
                    className="mt-2 flex items-center justify-between border-2 border-slate-200 px-3 py-3 rounded-lg cursor-pointer hover:border-slate-300 hover:bg-slate-100"
                    onClick={() =>
                      toggleModalEditor("Description of Certificate")
                    }
                  >
                    <div>
                      <p className="font-semibold text-sm">Description</p>
                      <p className="mt-2 text-[#717375] font-inter text-xs">
                        {description || "Description of Certificate"}
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
                    <p className="text-sm font-medium">ID Sertifikat</p>
                    <div className="flex items-center justify-center bg-[#0D804A] p-1 rounded-2xl">
                      <span className="font-semibold text-[10px] text-white">
                        CSV
                      </span>
                    </div>
                  </div>
                  {false && (
                    <>
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
                    </>
                  )}
                </div>
                <hr className="mt-5 border-none bg-[#D8DCDF] h-[1px]" />
                {false && (
                  <>
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
                    <hr className="mt-3 border-none bg-[#D8DCDF] h-[1px]" />
                  </>
                )}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Signature</h3>
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="text-sm font-semibold">
                      Amount of Signature Display
                    </label>
                    <SelectInput
                      className="mt-2"
                      options={signatureOptions}
                      placeholder="-- choose amount signature --"
                      onChange={(e) => handleSignatureDisplay(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Signature 1</p>
                  <div className="mt-2">
                    <label htmlFor="" className="text-xs font-semibold">
                      Name
                    </label>
                    <Input
                      placeholder="Name"
                      id="signature-name-1"
                      className="mt-2 h-10 text-xs"
                      onChange={handleSignatures}
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="text-xs font-semibold">
                      Position
                    </label>
                    <Input
                      placeholder="Position"
                      id="signature-position-1"
                      className="mt-2 h-10 text-xs"
                      onChange={handleSignatures}
                    />
                  </div>
                  {false && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold">
                        Upload Signature 1
                      </p>
                      <label className="flex items-center justify-center gap-2 text-center mt-4 w-full border-2 border-[#6240ED] px-6 py-3 rounded-lg text-xs text-[#6240ED] font-semibold cursor-pointer hover:bg-[#6240ED] hover:text-white">
                        <img
                          src={icons.size_guideline_purple}
                          alt="size guideline purple"
                        />
                        <span>Upload Signature</span>
                      </label>
                    </div>
                  )}
                </div>
                {amountSignature > 1 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold">Signature 2</p>
                    <div className="mt-2">
                      <label htmlFor="" className="text-xs font-semibold">
                        Name
                      </label>
                      <Input
                        placeholder="Name"
                        id="signature-name-2"
                        className="mt-2 h-10 text-xs"
                        onChange={handleSignatures}
                      />
                    </div>
                    <div className="mt-2">
                      <label htmlFor="" className="text-xs font-semibold">
                        Position
                      </label>
                      <Input
                        placeholder="Position"
                        id="signature-position-2"
                        className="mt-2 h-10 text-xs"
                        onChange={handleSignatures}
                        value={signatures.signature_position_2}
                      />
                    </div>
                    {false && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold">
                          Upload Signature 1
                        </p>
                        <label className="flex items-center justify-center gap-2 text-center mt-4 w-full border-2 border-[#6240ED] px-6 py-3 rounded-lg text-xs text-[#6240ED] font-semibold cursor-pointer hover:bg-[#6240ED] hover:text-white">
                          <img
                            src={icons.size_guideline_purple}
                            alt="size guideline purple"
                          />
                          <span>Upload Signature</span>
                        </label>
                      </div>
                    )}
                  </div>
                )}
                <hr className="mt-5 mb-5 border-none bg-[#D8DCDF] h-[1px]" />
              </div>
            </div>
          )}
          {!isTemplateTab && (
            <div className="w-full h-full flex flex-col gap-3 p-8">
              <p className="text-xl font-medium">Data Source</p>
              <div className="w-full h-full flex items-center gap-7">
                <div className="w-1/2 h-full flex flex-col gap-8 rounded-lg">
                  <div className="w-full h-1/2 p-8 border-2 border-slate-200 rounded-lg bg-[#f7f9fc] hover:border-slate-300 hover:bg-slate-100">
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
                    <hr className="mt-3 border-none bg-[#D8DCDF] h-[1px]" />
                    <div
                      className="p-3 w-full flex items-center justify-between mt-5 border-2 border-slate-200 rounded-lg bg-white cursor-pointer hover:border-slate-300"
                      onClick={handleDownloadTemplate}
                    >
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
                  <div className="w-full h-1/2 p-7 border-2 border-slate-200 rounded-lg bg-[#f7f9fc] hover:border-slate-300 hover:bg-slate-100">
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
                    <hr className="mt-3 border-none bg-[#D8DCDF] h-[1px]" />
                    <div className="w-full flex items-center justify-between mt-5">
                      <p className="text-[#5D5F60]">
                        Insert participant data into the CSV template according
                        to the provided columns.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 h-full px-8 py-8 border-2 border-slate-200 rounded-lg bg-[#f7f9fc] hover:border-slate-300 hover:bg-slate-100">
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
                    {!csvUploaded.name && (
                      <>
                        <label
                          htmlFor="uploaded-csv"
                          className="w-full h-full flex items-center justify-center mt-2 border-2 border-dashed border-slate-200 rounded-md bg-white cursor-pointer hover:border-slate-300 hover:bg-slate-50"
                        >
                          <div className="w-[70%] h-1/2 flex flex-col items-center justify-center gap-3">
                            <img src={icons.upload} alt="icon upload" />
                            <p className="text-center text-base font-semibold">
                              Upload Completed CSV
                            </p>
                            <p className="text-center text-sm text-[#5D5F60]">
                              Drag and drop the completed CSV template here, or{" "}
                            </p>
                            <label
                              htmlFor="uploaded-csv"
                              className="mt-2 px-4 py-2 text-white font-medium rounded-lg border border-[#a693f5] outline outline-white bg-gradient-to-t from-[#6240ED] to-[#917AF2] shadow-md cursor-pointer hover:bg-gradient-to-b hover:from-[#6240ED] hover:to-[#917AF2]"
                            >
                              Choose File
                            </label>
                          </div>
                        </label>
                        <input
                          type="file"
                          id="uploaded-csv"
                          accept=".xlsx, .csv"
                          className="hidden"
                          onChange={handleCsvUploaded}
                        />
                      </>
                    )}
                    {csvUploaded.name && (
                      <div className="w-full h-full flex flex-col">
                        <label
                          htmlFor="reupload-csv"
                          className={`w-full ${
                            csvUploaded.isEmptyField ? "h-[55%]" : "h-[75%]"
                          } flex items-center justify-center border-2 border-dashed px-10 py-5 border-slate-200 rounded-md bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer`}
                        >
                          <div className="w-full flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-12 flex items-center justify-center bg-[#43936c] p-5 rounded-md">
                                <span className="font-semibold text-sm text-white">
                                  CSV
                                </span>
                              </div>
                              <div>
                                <p className="font-semibold">
                                  {csvUploaded.name}
                                </p>
                                <p className="text-[#717375] text-xs">
                                  Uploaded{" "}
                                  {new Intl.DateTimeFormat("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  }).format(csvUploaded.date)}
                                </p>
                              </div>
                            </div>
                            <label
                              htmlFor="reupload-csv"
                              className="font-bold text-[#6240ED] text-sm cursor-pointer hover:text-[#6240ED]/80"
                            >
                              Change
                            </label>
                            <input
                              id="reupload-csv"
                              type="file"
                              accept=".xlsx, .csv"
                              className="hidden"
                              onChange={handleCsvUploaded}
                            />
                          </div>
                        </label>
                        {csvUploaded.isEmptyField && (
                          <div className="mt-5 w-full h-[15%] flex items-center py-2">
                            <div className="w-full px-3 py-2 border-1 border-[#eeb4b0] flex items-center justify-start rounded-lg bg-[#fff4f2] hover:bg-[#fff4f2]/80 hover:border-[#eeb4b0]/80">
                              <div className="w-[70%] flex items-center gap-2">
                                <span>
                                  <img src={icons.warning_danger} alt="" />
                                </span>
                                <div className="flex flex-col gap-1">
                                  <p className="text-sm font-bold">
                                    Incomplete Data
                                  </p>
                                  <p className="text-xs">
                                    There are cells that are missing numbers or
                                    text.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="w-full h-[25%] flex items-center py-2">
                          <div className="w-full py-2 border-1 border-[#b1c5f6] flex items-center justify-around rounded-lg bg-[#f0f3ff] hover:bg-[#f0f3ff]/80 hover:border-[#b1c5f6]/80">
                            <div className="w-[70%] flex items-center gap-2">
                              <span>
                                <img src={icons.check_circle} alt="" />
                              </span>
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-bold">
                                  {csvUploaded.total} rows of data detected.
                                </p>
                                <p className="text-xs">
                                  Certificates will be generated based on the
                                  number of detected entries.
                                </p>
                              </div>
                            </div>
                            <div>
                              <button className="px-4 py-2 flex items-center gap-2 text-white text-sm font-medium rounded-lg border border-[#7c9ded] outline outline-[#517bf5] bg-gradient-to-t from-[#3267e3] to-[#6c91eb] shadow-md cursor-pointer hover:bg-gradient-to-b hover:from-[#3267e3] hover:to-[#6c91eb]">
                                <span>
                                  <img src={icons.eye} alt="" />
                                </span>
                                See Data
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {!isTemplateTab && (
          <div className="w-full flex items-center justify-end gap-10 py-5">
            <p
              className="font-inter font-bold text-[#6240ED] text-base cursor-pointer hover:text-[#6240ED]/80"
              onClick={() => handleNavigate("/generate")}
            >
              Cancel
            </p>
            <Button
              className="flex items-center gap-2"
              onClick={toggleModalConfirmGenerate}
              disabled={csvUploaded.total < 1 || csvUploaded.isEmptyField}
            >
              <img src={icons.plus} alt="icon plus" />
              Generate Certificate
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailGeneratePage;
