import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/molecules/Navbar";
import ModalNewCertificate from "../../components/molecules/ModalNewCertificate";

import { backgrounds, icons, images } from "../../constants";

import type { RootState, AppDispatch } from "../../store";
import { extractCertificateID } from "../../utils/certificate";
import { motoko_try_backend } from '../../../../declarations/motoko-try-backend';


import { processOCR } from "../../store/ocr/action";

const ValidatePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [idCertificates, setIdCertificates] = useState<string[]>([]);
  const [dataParticipant, setDataParticipant] = useState<any>([]);

  const navigate = useNavigate();

  const ocrResults = useSelector((state: RootState) => state.ocr.results);

  const dispatch = useDispatch<AppDispatch>();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      await dispatch(processOCR(Array.from(files)));
      handleNavigate("/validate");
    }
  };

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  const getCertificateUser = async (extractedIds: string[])  => {
    let resGetCertif = await motoko_try_backend.getAllCustCertificates(extractedIds)

    console.log("====> Res get certif", resGetCertif)

    setDataParticipant(resGetCertif.data[0])
    return 
  }

  useEffect(() => {
    const extractedIds = ocrResults
      .map((result) => extractCertificateID(result.text))
      .filter((id): id is string => id !== null && id !== undefined);
    
    getCertificateUser(extractedIds);

    const uniqueIds = Array.from(new Set([...idCertificates, ...extractedIds]));



    setIdCertificates(uniqueIds);
  }, [ocrResults]);

  // const data_participants = [
  //   {
  //     id: "R5D8ISOQOY",
  //     status: "Not Found",
  //     eventId: 1,
  //     link: "#",
  //     participantName: "r8hvwy8",
  //     roleDescription: "2f1ffv",
  //     certificateTitle: "m4zhzio",
  //     issuedBy: "Tes Issued",
  //     eventName: "Tes event",
  //   },
  //   {
  //     id: "R5D8ISOQOY",
  //     status: "REGISTERED",
  //     eventId: 1,
  //     link: "b6jduba",
  //     participantName: "r8hvwy8",
  //     roleDescription: "2f1ffv",
  //     certificateTitle: "m4zhzio",
  //     issuedBy: "Tes Issued",
  //     eventName: "Tes event",
  //   },
  //   {
  //     id: "R5D8ISOQOY",
  //     status: "Not Found",
  //     eventId: 1,
  //     link: "#",
  //     participantName: "r8hvwy8",
  //     roleDescription: "2f1ffv",
  //     certificateTitle: "m4zhzio",
  //     issuedBy: "Tes Issued",
  //     eventName: "Tes event",
  //   },
  //   {
  //     id: "R5D8ISOQOY",
  //     status: "REGISTERED",
  //     eventId: 1,
  //     link: "b6jduba",
  //     participantName: "r8hvwy8",
  //     roleDescription: "2f1ffv",
  //     certificateTitle: "m4zhzio",
  //     issuedBy: "Tes Issued",
  //     eventName: "Tes event",
  //   },
  //   {
  //     id: "R5D8ISOQOY",
  //     status: "REGISTERED",
  //     eventId: 1,
  //     link: "b6jduba",
  //     participantName: "r8hvwy8",
  //     roleDescription: "2f1ffv",
  //     certificateTitle: "m4zhzio",
  //     issuedBy: "Tes Issued",
  //     eventName: "Tes event",
  //   },
  // ];

  const totalNotFound = dataParticipant.filter(
    (item) => item.status === "Not Found"
  ).length;

  const totalValidates = dataParticipant.length;

  return (
    <div className="w-full h-[1200px] font-dm-sans">
      <ModalNewCertificate open={showModal} onClose={toggleModal} />
      <Navbar logo_color="text-[#653FFF]" menu_color="text-black" />
      <div
        className="h-full px-20 pt-3 bg-cover bg-no-repeat bg-[position:10%_10%]"
        style={{
          backgroundImage: `url(${backgrounds.background})`,
        }}
      >
        <div className="w-full min-h-[520px] mt-20 mb-20 px-20 py-10 border border-white/25 bg-white mx-auto rounded-lg">
          {idCertificates.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 w-[70%] h-full mx-auto">
              <div className="mt-[-20px]">
                <img
                  src={images.generate_not_found}
                  width={180}
                  alt="nothing data"
                />
              </div>
              <h2 className="mt-3 text-center text-3xl font-black">
                No Certificates Yet! <br /> Validate Your Official Certificate
              </h2>
              <p className="text-[#717375]">
                Drop it like it’s hot 🔥 Validify tells you if that cert is real
                or cap — in seconds.
              </p>
              <div className="mt-10">
                <label
                  htmlFor="fileInput"
                  className="mt-5 px-7 py-2 text-white text-lg font-normal rounded-lg border border-[#a693f5] outline outline-slate-200 bg-linear-to-t from-[#6240ED] to-[#917AF2] shadow-md cursor-pointer hover:bg-linear-to-b hover:from-[#6240ED] hover:to-[#917AF2]"
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
              </div>
            </div>
          )}
          {idCertificates.length > 0 && (
            <div className="flex flex-col items-center justify-center gap-2 w-full h-full mx-auto">
              <div className="w-full">
                <h3 className="font-bold text-2xl">Certificate Validation</h3>
              </div>
              {totalNotFound === 0 && (
                <div className="mt-3 w-full px-3 py-2 border-1 border-[#b1c5f6] flex items-center justify-start rounded-lg bg-[#f0f3ff] hover:bg-[#f0f3ff]/80 hover:border-[#b1c5f6]/80">
                  <div className="w-[70%] flex items-center gap-2">
                    <span>
                      <img src={icons.check_circle} alt="" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-bold">
                        All Certificates Successfully Detected
                      </p>
                      <p className="text-sm">
                        Great! All {totalValidates} of your certificates are
                        registered and verified in our system.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {totalNotFound > 0 && (
                <div className="mt-3 w-full px-3 py-2 border-1 border-[#eeb4b0] flex items-center justify-start rounded-lg bg-[#fff4f2] hover:bg-[#fff4f2]/80 hover:border-[#eeb4b0]/80">
                  <div className="w-[70%] flex items-center gap-2">
                    <span>
                      <img src={icons.warning_danger} alt="" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-bold">
                        {totalNotFound} of {totalValidates} Certificates Not
                        Detected
                      </p>
                      <p className="text-sm">
                        They might be registered on a different platform. You
                        can check them manually via the alternative link.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="w-full mt-5">
                <div className="w-full h-ful relative overflow-x-auto sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-sm text-black bg-[#EBF0F4] font-inter">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Certificate Title
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Participant Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Issued By
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Cert ID
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Link
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataParticipant.map((item, index) => (
                        <tr className="border-b border-gray-200" key={index}>
                          <td className={`px-6 py-3 `}>
                            {item.certificateTitle}
                          </td>
                          <td className={`px-6 py-3`}>
                            {item.participantName}
                          </td>
                          <td className={`px-6 py-3`}>{item.issuedBy}</td>
                          <td className={`px-6 py-3`}>
                            {item.roleDescription}
                          </td>
                          <td
                            className={`px-6 py-3 ${
                              item.status === "Not Found"
                                ? "text-[#DC213E]"
                                : "text-[#43936C]"
                            }`}
                          >
                            {item.status}
                          </td>
                          <td className={`px-6 py-3`}>{item.id}</td>
                          <td className={`px-6 py-3`}>
                            <a
                              href={item.link}
                              className={`${
                                item.link !== "#"
                                  ? "text-[#3267E3] underline"
                                  : ""
                              }`}
                            >
                              {item.link === "#" ? "-" : "See Certificate"}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidatePage;
