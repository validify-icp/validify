import { useNavigate, useParams, useSearchParams, } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/molecules/Navbar";
import Button from "../../components/elements/Button";

import { backgrounds, icons } from "../../constants";
import { useEffect } from "react";
import { validify_project_backend } from "../../../../declarations/validify-project-backend";

interface CertificateNew {
  id: string;
  eventId: number;
  certificateStatus: string;
  participantName: string;
  participantRole: string;
  description: string;
  certificateTitle: string;
  certificateLabel: string;
  certificateLink: string;
  participantStatus: string;
  eventDate: string;
  eventName: string;
}

const ResultGeneratePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [certificates, setCertificates] = useState<CertificateNew[]>([]);

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  const getCertificatesByEventId = async (eventId: bigint) => {
    const resultCertificates = await validify_project_backend.getCertificatesByEvent(eventId);
  
    // If your backend returns an object like { data: [...] }, adjust accordingly:
    const data = resultCertificates?.data[0];
    setCertificates(data);
  };


  useEffect(() => {

    const eventId = searchParams.get("eventId");
    getCertificatesByEventId(Number(eventId))



  }, [id])

  return (
    <div className="w-full h-[1300px] font-dm-sans">
      <Navbar logo_color="text-[#653FFF]" menu_color="text-black" />
      <div
        className="h-full px-20 pt-3 bg-cover bg-no-repeat bg-[position:10%_10%]"
        style={{
          backgroundImage: `url(${backgrounds.background})`,
        }}
      >
        <div className="w-full min-h-[520px] mt-20 mb-20 px-20 py-10 border border-white/25 bg-white mx-auto rounded-lg">
          <div className="mt-5">
            <p className="text-black font-medium text-base">
              <span
                className="text-[#535760] cursor-pointer"
                onClick={() => handleNavigate("/generate")}
              >
                Generate {">"}
              </span>{" "}
              {/* Class A Certificate of Completion */}
              {certificates[0]?.eventName}
            </p>
          </div>
          <div className="mt-2 w-full h-[22 0px] flex flex-col p-7 bg-linear-to-r from-[#B14EDF] to-[#B14EDF]/80 rounded-lg shadow-lg">
            <div className="w-full flex justify-between">
              <span
                className="cursor-pointer"
                onClick={() => handleNavigate("/generate")}
              >
                <img
                  src={icons.arrow_left_white}
                  width={35}
                  alt="icon arrow left"
                />
              </span>
              <span className="border-2 border-[#b8dbca] p-2 text-[#43936C] text-sm font-semibold font-inter bg-[#F6F6F6] rounded-md">
                Published
              </span>
            </div>
            <div className="w-full mt-2">
              <p className="text-2xl font-semibold text-white">
              {certificates[0]?.eventName}
              {certificates[0]?.certificateTitle ? ` | ${certificates[0].certificateTitle}` : ""}

              </p>
              <div className="flex items-center text-white gap-2">
                <p className="text-sm">2 Pages</p>
                <span className="w-[4px] h-[4px] rounded-full bg-[#EBF0F4]"></span>
                <p className="text-sm">From Certificate Template</p>
              </div>
            </div>
            <div className="w-full mt-5">
              <p className="w-[155px] flex items-center gap-2 px-2 py-2 text-sm text-[#5D5F60] text-center bg-white rounded-md">
                <img
                  src={icons.certificate}
                  width={20}
                  alt="icon certificate"
                />
                <span>{ certificates.length } Certificate</span>
              </p>
            </div>
          </div>
          <div className="w-full mt-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold font-inter">
              All Generated Certificate
            </h2>
            <Button className="flex items-center gap-2 font-inter text-sm">
              <img src={icons.download_2} width={20} alt="icon download 2" />
              Download All Certificate
            </Button>
          </div>
          <div className="w-full mt-5">
            <input
              type="text"
              className="w-full h-12 bg-[#EBF0F4] rounded-md px-4 placeholder:text-sm"
              placeholder="Search certificate name..."
            />
          </div>
          <div className="w-full mt-5">
            <div className="relative overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-sm text-black bg-[#EBF0F4] font-inter">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Participant Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {certificates.map((cert, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {cert.participantName}
                    </th>
                    <td className="px-6 py-4">{cert.participantRole || "-"}</td>
                    <td className="px-6 py-4">{cert.participantStatus}</td>
                    <td className="px-6 py-4">{cert.eventDate}</td>
                    <td className="px-6 py-4">
                      <a className="underline text-blue-500" href={cert.certificateLink} target="_blank">
                        See Certificate
                      </a>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultGeneratePage;
