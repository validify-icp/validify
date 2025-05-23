import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import Navbar from "../../components/molecules/Navbar";
import ModalNewCertificate from "../../components/molecules/ModalNewCertificate";

import { backgrounds, icons, images } from "../../constants";

const RegisterPage = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleNavigate = (href: string) => {
    navigate(href);
  };

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
          {true && (
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
                <Button label="Select Certificate File" />
              </div>
            </div>
          )}
          {false && (
            <div className="w-full h-full mx-auto">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-3xl font-medium">Generate</h3>
                <Button
                  label="Generate New Certificate"
                  onClick={toggleModal}
                />
              </div>
              <div className="mt-8 w-full flex items-center justify-between">
                <Input placeholder="Search" className="h-12 bg-[#EBF0F4]" />
              </div>
              <div className="mt-8 w-full flex flex-wrap gap-5 items-center justify-between">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    className="px-4 py-6 flex flex-col justify-between gap-5 w-[280px] h-[330px] rounded-md border-2 border-slate-200/40"
                    key={i}
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[#43936C] border border-[#b8dbca] px-2 py-1 rounded-md bg-[#F6F6F6]">
                          Published
                        </span>
                        <img src={icons.action} alt="action icon" />
                      </div>
                      <h4 className="w-[80%] text-xl font-medium">
                        Sertifikat Kampus Merdeka Batch 2 - 2022
                      </h4>
                      <div>
                        <span className=" text-[#4E5BA6] px-2 py-1 rounded-md bg-[#F2F4F9]">
                          Webinar
                        </span>
                      </div>
                    </div>
                    <Button
                      label="See Result"
                      onClick={() => handleNavigate("/generate/1/result")}
                    />
                  </div>
                ))}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    className="px-4 py-6 flex flex-col justify-between gap-5 w-[280px] h-[330px] rounded-md border-2 border-slate-200/40"
                    key={i}
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[#43936C] border border-[#b8dbca] px-2 py-1 rounded-md bg-[#F6F6F6]">
                          Published
                        </span>
                        <img src={icons.action} alt="action icon" />
                      </div>
                      <h4 className="w-[80%] text-xl font-medium">
                        Sertifikat Kampus Merdeka Batch 2 - 2022
                      </h4>
                      <div>
                        <span className=" text-[#4E5BA6] px-2 py-1 rounded-md bg-[#F2F4F9]">
                          Webinar
                        </span>
                      </div>
                    </div>
                    <Button
                      label="Edit"
                      onClick={() => handleNavigate("/generate/1")}
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

export default RegisterPage;
