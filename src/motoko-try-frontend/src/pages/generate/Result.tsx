import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

import { backgrounds, icons } from "../../constants";

const ResultGeneratePage = () => {
  return (
    <div className="w-full h-[1200px] font-dm-sans">
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
              <span className="text-[#535760]">Generate {">"}</span> Class A
              Certificate of Completion
            </p>
          </div>
          <div className="mt-2 w-full h-[22 0px] flex flex-col p-7 bg-linear-to-r from-[#B14EDF] to-[#B14EDF]/80 rounded-lg shadow-lg">
            <div className="w-full flex justify-between">
              <img
                src={icons.arrow_left_white}
                width={35}
                alt="icon arrow left"
              />
              <span className="border-2 border-[#b8dbca] p-2 text-[#43936C] text-sm font-semibold font-inter bg-[#F6F6F6] rounded-md">
                Published
              </span>
            </div>
            <div className="w-full mt-2">
              <p className="text-2xl font-semibold text-white">
                Class A Certificate of Completion
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
                <span>1.307 Certificate</span>
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
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <tr className="border-b border-gray-200">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Multazam Arkham
                      </th>
                      <td className="px-6 py-4">Mahasiswa MSIB </td>
                      <td className="px-6 py-4">Completed</td>
                      <td className="px-6 py-4">08/09/24</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
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
