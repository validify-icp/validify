import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import Navbar from "../../components/molecules/Navbar";
import ModalNewCertificate from "../../components/molecules/ModalNewCertificate";
import { validify_project_backend } from '../../../../declarations/validify-project-backend';

import { backgrounds, icons, images } from "../../constants";

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

const GeneratePage = () => {
  const [showModal, setShowModal] = useState(false);
  const[search, setSearch] = useState([]);
  const [certificates, setCertificates] = useState<CertificateNew[]>([]);


  const navigate = useNavigate();

  const fetchCertificates = async (): Promise<CertificateNew[]> => {
    try {
      const res = await validify_project_backend.getAllCertificates();
  
      if (!res?.data) return [];
  
      const seen = new Set<number>();
      const uniqueCerts: CertificateNew[] = [];
  
      for (const cert of res.data[0]) {
        if (!seen.has(cert.eventId)) {
          seen.add(cert.eventId);
          uniqueCerts.push(cert);
        }
      }
  
      return uniqueCerts;
    } catch (err) {
      console.error("Failed to fetch certificates", err);
      return [];
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleNavigate = (href: string) => {
    navigate(href);
  };


  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCertificates();
      setCertificates(data);
      setSearch(data)
    };
    loadData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // let data = certificates
    const data = certificates.find((item) => item.eventName.toLowerCase().includes(e.target.value));
    if(!e.target.value){
      setSearch(certificates)
    } else {
      if(data){
        setSearch([data]);
      } else {
        setSearch([]);
      }
    }

  }

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
          {false && (
            <div className="flex flex-col items-center justify-center gap-2 w-[70%] h-full mx-auto">
              <div className="mt-[-20px]">
                <img
                  src={images.generate_not_found}
                  width={180}
                  alt="nothing data"
                />
              </div>
              <h2 className="mt-3 text-center text-3xl font-black">
                No Certificates Yet! <br /> Generate Your Official Certificate
              </h2>
              <p className="text-[#717375]">
                Once you create a certificate, it will appear here. Ready to
                make your first one?
              </p>
              <div className="mt-10">
                <Button label="Generate Certificate" />
              </div>
            </div>
          )}
          {true && (
            <div className="w-full h-full mx-auto">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-3xl font-medium">Generate</h3>
                <Button
                  onClick={toggleModal}
                  className="flex items-center gap-2"
                >
                  <img src={icons.plus} alt="icon plus" />
                  Generate New Certificates
                </Button>
              </div>
              <div className="mt-8 w-full flex items-center justify-between">
                <Input placeholder="Search" className="h-12 bg-[#EBF0F4]" onChange={handleSearch} />
              </div>
              <div className="mt-8 w-full flex flex-wrap gap-5 items-center justify-between">
      {search.map((cert) => (
        <div
          className="px-4 py-6 flex flex-col justify-between gap-5 w-[280px] h-[330px] rounded-md border-2 border-slate-200/40 hover:border-slate-100 hover:bg-slate-50"
          key={cert.id}
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span
                className={`${
                  cert.certificateStatus === "Registered"
                    ? "text-[#43936C] border-[#b8dbca] bg-[#F6F6F6]"
                    : "text-[#3D3F40] border-[#b8dbca] bg-[#EBF0F4]"
                } border px-2 py-1 rounded-md`}
              >
                Published
              </span>
              <img src={icons.action} alt="action icon" />
            </div>
            <h4 className="w-[80%] text-xl font-medium">
              {cert.eventName}
            </h4>
            <div>
              <span className=" text-[#4E5BA6] px-2 py-1 rounded-md bg-[#F2F4F9]">
                Webinar
              </span>
            </div>
          </div>
          <Button
            label={cert.certificateStatus === "Registered" ? "See Result" : "Edit"}
            onClick={() =>
              handleNavigate(
                cert.certificateStatus === "Registered"
                  ? `/generate/${cert.id}/result?eventId=${cert.eventId}`
                  : `/generate/${cert.id}`
              )
            }
          />
        </div>
      ))}
    </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
