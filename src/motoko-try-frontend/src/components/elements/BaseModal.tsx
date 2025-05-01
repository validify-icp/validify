import { ReactElement } from "react";

interface ModalProps {
  open: boolean;
  children: ReactElement;
}

const BaseModal = ({ open, children }: ModalProps) => {
  return (
    <div
      className={`${"fixed top-0 left-0 z-[222] w-full h-full bg-black/75 font-dm-sans"} ${
        open ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default BaseModal;
