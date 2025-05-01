import { useNavigate } from "react-router-dom";

import { icons } from "../../constants";

import Button from "../elements/Button";
import BaseModal from "../elements/BaseModal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalNewCertificate = ({ open, onClose }: ModalProps) => {
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    navigate(href);
  };
  return (
    <BaseModal open={open}>
      <div className="modal-main fixed w-[690px] px-8 py-8 top-[25%] left-[25%] flex flex-col items-center rounded-xl bg-white">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl font-semibold">Create New Certificate</h1>
          <span
            className="cursor-pointer hover:bg-[#eae9e9] hover:rounded-full p-2"
            onClick={onClose}
          >
            <img src={icons.close} width={28} alt="icon close" />
          </span>
        </div>
        <div className="mt-5 w-full">
          <label htmlFor="new-certificate" className="text-base font-medium">
            Event/Certificate Name
          </label>
          <input
            name="new-certificate"
            id="new-certificate"
            className="mt-2 border-2 border-slate-200 w-full px-2 py-3 text-sm rounded-md"
            placeholder="Type the title..."
          />
        </div>
        <hr className="mt-10 mb-5 w-full border-none bg-[#D8DCDF] h-[2px]" />
        <div className="mt-2 w-full flex items-center justify-end">
          <Button onClick={() => handleNavigate("/generate/1")}>
            Create and Generate
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalNewCertificate;
