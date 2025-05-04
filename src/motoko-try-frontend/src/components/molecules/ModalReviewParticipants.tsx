import { useState } from "react";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import BaseModal from "../elements/BaseModal";

import { icons } from "../../constants";
import { RootState } from "../../store";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalReviewParticipants = ({ open, onClose }: ModalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data_participants } = useSelector(
    (state: RootState) => state.certificate
  );

  const totalPages = Math.ceil(data_participants.length / itemsPerPage);
  const paginatedData = data_participants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalItems = data_participants.length;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <BaseModal open={open}>
      <div className="modal-main fixed w-[60%] h-[92%] px-8 py-8 top-[5%] left-[15%] flex flex-col items-center bg-white">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl font-semibold">Preview Data CSV</h1>
          <span
            className="cursor-pointer hover:bg-[#eae9e9] hover:rounded-full p-2"
            onClick={onClose}
          >
            <img src={icons.close} width={28} alt="icon close" />
          </span>
        </div>
        <div className="w-full mt-5">
          <div className="h-ful relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-sm text-black bg-[#EBF0F4] font-inter">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    ID Participant
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name Participant
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr className="border-b border-gray-200" key={index}>
                    <td
                      className={`px-6 py-3 ${
                        item.ID === "" ? "bg-[#fce9ec]" : ""
                      }`}
                    >
                      {item.ID}
                    </td>
                    <td
                      className={`px-6 py-3 ${
                        item.Nama === "" ? "bg-[#fce9ec]" : ""
                      }`}
                    >
                      {item.Nama}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
                currentPage * itemsPerPage,
                totalItems
              )} of ${totalItems} items`}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${
                  currentPage === 1
                    ? "bg-white text-gray-400 cursor-not-allowed"
                    : "bg-[#6240ED] text-white hover:bg-[#6240ED]/80"
                }`}
              >
                <span>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded border border-slate-300 ${
                        currentPage === page
                          ? "bg-[#6240ED] text-white border-[#6240ED]"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${
                  currentPage === totalPages
                    ? "bg-white text-gray-400 cursor-not-allowed"
                    : "bg-[#6240ED] text-white hover:bg-[#6240ED]/80"
                }`}
              >
                <span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalReviewParticipants;
