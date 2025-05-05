import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import JSZip from "jszip";

import CertificateTemplate from "../template/CertificateTemplate";
import Button from "../elements/Button";
import BaseModal from "../elements/BaseModal";
import Loading from "../elements/Loading";

import { RootState } from "../../store";

import { icons, images } from "../../constants";
import uploadToCloudinary from "../../utils/cloudinary";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

const ModalConfirmGenerate = ({ open, onClose }: ModalProps) => {
  const certificateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    title,
    description,
    label,
    template,
    custom_template,
    data_participants,
    signature_amount,
    signature_name_1,
    signature_position_1,
    signature_name_2,
    signature_position_2,
  } = useSelector((state: RootState) => state.certificate);

  useEffect(() => {}, [title]);

  const handleDownload = async () => {
    setIsLoading(true);

    const urls: string[] = [];
    const zip = new JSZip();

    await new Promise((resolve) => setTimeout(resolve, 300));

    for (let i = 0; i < data_participants.length; i++) {
      const ref = certificateRefs.current[i];
      if (ref) {
        const canvas = await html2canvas(ref, {
          useCORS: true,
          scale: 2,
        });
        const imageData = canvas.toDataURL("image/png");

        const imageUrl = await uploadToCloudinary(imageData);
        urls.push(imageUrl);

        zip.file(`${data_participants[i].ID}.png`, imageData.split(",")[1], {
          base64: true,
        });

        // TO DO : add to database
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "certificates.zip");

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <BaseModal open={open}>
        <div className="modal-main fixed w-[535px] px-8 py-8 top-[20%] left-[30%] flex flex-col items-center rounded-xl bg-white">
          <div className="mt-5 w-full flex flex-col gap-5">
            <div className="flex items-center justify-center">
              <img
                className="p-3 bg-[#fce9ec] rounded-xl"
                src={icons.exclamation}
                alt=""
              />
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <p className="text-xl font-bold">Generate Certificates Now?</p>
              <p className="text-[#717375]">
                You won’t be able to access this file until all certificates
                have been successfully generated.
              </p>
            </div>
          </div>
          {data_participants.map((participant: any, index) => (
            <div
              className="absolute pointer-events-none -z-50 top-[1000%]"
              key={participant.ID}
              ref={(el) => {
                certificateRefs.current[index] = el;
              }}
            >
              <CertificateTemplate
                data={participant}
                background={custom_template || images[template]}
                title={title}
                label={label}
                description={description}
                signatures={{
                  signature_name_1: signature_name_1,
                  signature_position_1: signature_position_1,
                  signature_name_2: signature_name_2,
                  signature_position_2: signature_position_2,
                }}
                amountSignature={signature_amount}
              />
            </div>
          ))}

          <hr className="mt-10 mb-5 w-full border-none bg-[#D8DCDF] h-[1px]" />

          <div className="mt-3 w-full flex items-center justify-end gap-5">
            <p
              className="font-inter font-bold text-[#6240ED] text-sm cursor-pointer hover:text-[#6240ED]/80"
              onClick={onClose}
            >
              Cancel
            </p>
            <Button className="text-xs" onClick={handleDownload}>
              Generate Now
            </Button>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default ModalConfirmGenerate;
