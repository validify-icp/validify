import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import Navbar from "../../components/molecules/Navbar";

import { processOCR } from "../../store/ocr/action";

import { extractCertificateID } from "../../utils/certificate";

import { icons, images, logos } from "../../constants";

import type { RootState, AppDispatch } from "../../store";
import Loading from "../../components/elements/Loading";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ocrResults = useSelector((state: RootState) => state.ocr.results);
  const loading = useSelector((state: RootState) => state.ocr.loading);

  const navigate = useNavigate();

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

  return (
    <div className="w-full h-auto font-dm-sans">
      <div
        className="h-[806px] px-0 pt-3 bg-cover bg-no-repeat bg-[position:0%_120%]"
        style={{
          backgroundImage: `url(${images.hero})`,
        }}
      >
        <Navbar />
        {loading && <Loading />}
        <div className="mt-20 py-10 max-sm:mt-0">
          <div className="w-[60%] mx-auto max-sm:w-full">
            <h1 className="text-5xl text-white text-center font-bold whitespace-pre-line max-sm:text-3xl">
              <span>
                <TypeAnimation
                  sequence={[
                    "Build Trust with Every Certificate,\nReady in Minutes!",
                    2000,
                    "",
                    1000,
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                />
              </span>
            </h1>
          </div>
          <div className="w-[65%] h-[420px] mt-8 px-5 py-5 border border-white/25 bg-white/25 backdrop-blur-sm mx-auto rounded-lg shadow-md max-sm:w-[90%] max-sm:h-[300px]">
            <div className="h-full flex flex-col gap-5 items-center justify-center border border-slate-200/20 bg-white rounded-lg px-3 py-3 max-sm:p-4">
              <h2 className="text-3xl font-bold max-sm:text-xl">
                Drag, Drop, and Done
              </h2>
              <p className="mt-2 text-xl text-center max-sm:text-sm">
                Drop it like it’s hot 🔥 <br /> Validify tells you if that cert
                is real or cap — in seconds.
              </p>
              <label
                htmlFor="fileInput"
                className="mt-5 px-7 py-2 text-white text-lg font-normal rounded-lg border border-[#a693f5] outline outline-slate-200 bg-linear-to-t from-[#6240ED] to-[#917AF2] shadow-md cursor-pointer hover:bg-linear-to-b hover:from-[#6240ED] hover:to-[#917AF2] max-sm:text-sm max-sm:mt-0"
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
              <p className="mt-[-10px] text-xl max-sm:text-sm">
                or drop file here
              </p>
            </div>
          </div>
        </div>
        {false && <p className="text-blue-600">Processing OCR...</p>}

        {false && (
          <div className="space-y-4">
            {ocrResults.map((result, index) => (
              <div key={index} className="p-2 border rounded">
                <h2 className="font-semibold">{result.filename}</h2>
                <p className="text-sm text-gray-600">
                  Progress: {result.progress}%
                </p>
                <pre className="whitespace-pre-wrap text-sm mt-2 bg-gray-100 p-2 rounded">
                  ID: {extractCertificateID(result.text)}
                </pre>
              </div>
            ))}
          </div>
        )}

        <section className="mt-24 w-[80%] flex flex-col gap-5 items-center justify-center mx-auto">
          <img src={logos.sponsors} alt="sponsors logo" />
        </section>

        <section className="mt-32 w-[80%] flex flex-col gap-5 items-center justify-center mx-auto">
          <div className="w-full flex items-center justify-center gap-5">
            <h3 className="text-2xl font-bold">About</h3>
            <div className="flex items-center gap-2 text-[#653FFF]">
              <img src={logos.main_purple} width={30} alt="logo purple" />
              <span className="font-bold text-2xl">Validify</span>
            </div>
          </div>
          <p className="text-xl text-[#676767] text-center">
            Validify is here to simplify the certificate verification and
            registration process. With digital-based <br /> verification
            technology, \we ensure your certificates remain secure, recognized,
            and easily accessible anytime.
          </p>
        </section>

        <section className="mt-32 w-[80%] flex gap-5 items-start justify-center mx-auto max-sm:flex-col max-sm:items-center">
          <div className="w-1/3 flex flex-col items-center justify-center gap-2 max-sm:w-full">
            <img src={icons.verified} width={50} alt="logo purple" />
            <h3 className="text-2xl font-bold">Certificate Verification</h3>
            <p className="text-xl text-[#676767] text-center">
              Quickly check the authenticity of certificates through our system
            </p>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center gap-2 max-sm:w-full">
            <img src={icons.certified} width={50} alt="logo purple" />
            <h3 className="text-2xl font-bold">Certificate Registration</h3>
            <p className="text-xl text-[#676767] text-center">
              Register your new certificates to protect and strengthen their
              legitimacy
            </p>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center gap-2 max-sm:w-full">
            <img src={icons.monitoring} width={50} alt="logo purple" />
            <h3 className="text-2xl font-bold">Monitoring Dashboard</h3>
            <p className="text-xl text-[#676767] text-center">
              Easily track your certificates in one dashboard
            </p>
          </div>
        </section>

        <section className="mt-32 w-full flex gap-5 items-start justify-start mx-auto mb-10 max-sm:flex-col max-sm:items-center">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              className="w-1/4 px-3 py-5 flex flex-col items-center justify-center gap-1 bg-[#3E66DF] rounded-xl max-sm:w-[90%]"
              key={index}
            >
              <img
                className="w-[50%]"
                src={images.three_peoples}
                alt="logo purple"
              />
              <h3 className="text-2xl font-bold text-white">Leticia Kutch</h3>
              <p className="text-sm text-[#B9C8F3] text-center">
                Sapiente occaecati exercitationem quasi eum corporis sit. Aut
                consectetur maxime debitis quam voluptatem aut consequatur
                voluptatum.
              </p>
              <div className="flex items-center gap-5">
                <p className="text-[#B9C8F3]">
                  <span className="text-2xl font-bold text-white">5.0</span> /
                  5.0 rating
                </p>
                <span>
                  <img src={icons.five_stars} alt="five stars" />
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-32 w-[80%] flex flex-col gap-4 items-center justify-center mx-auto">
          <div className="w-full flex items-center justify-center gap-5">
            <h3 className="text-2xl font-bold">
              Ready to start verifying or registering your certificates?
            </h3>
          </div>
          <p className="text-xl text-[#676767] text-center">
            Join thousands of users who already trust Validify!
          </p>
          <div className="flex items-center gap-5">
            <Button label="Sign Up Now!" className="max-sm:text-sm" />
            <p className="font-bold text-xl">Or</p>
            <p className="font-bold text-xl text-[#0C6FD9]">Try it for free</p>
          </div>
        </section>

        <footer className="mt-32 px-32 py-14 w-full mx-auto mb-10 bg-gradient-to-r from-[#653FFF] to-[#1C2792] max-sm:px-0">
          <div className="w-full flex justify-around items-start gap-2 max-sm:flex-col max-sm:items-center">
            <div className="w-1/4 flex flex-col items-center justify-center gap-8 max-sm:w-full max-sm:gap-2">
              <div className="flex items-center gap-2 text-white">
                <img src={logos.main} width={30} alt="logo purple" />
                <span className="font-bold text-2xl">Validify</span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <p className="text-xl text-white">+62 854-7123-9712</p>
                <p className="text-lg text-white">support@Validify</p>
              </div>
            </div>
            <div className="w-[35%] flex flex-col justify-center gap-8 max-sm:w-full max-sm:items-center max-sm:gap-2">
              <p className="text-xl text-white font-bold">Quick Links</p>
              <div className="w-full flex items-center justify-between max-sm:flex-col max-sm:gap-2">
                <div className="flex flex-col items-start gap-8 max-sm:gap-2 max-sm:items-center">
                  <p className="text-xl text-white/50 text-center">Sign In</p>
                  <p className="text-xl text-white/50 text-center">
                    Information
                  </p>
                </div>
                <div className="flex flex-col items-start gap-8 max-sm:gap-2 max-sm:items-center">
                  <p className="text-xl text-white/50 text-center">Subscribe</p>
                  <p className="text-xl text-white/50 text-center">Validify</p>
                </div>
              </div>
            </div>
            <div className="w-1/4 flex flex-col items-start justify-center gap-5 max-sm:w-full max-sm:items-center">
              <h3 className="text-xl font-bold text-white">Subscribe</h3>
              <Input
                placeholder="Get product updates"
                className="bg-white max-sm:w-1/2"
              />
            </div>
          </div>
          <hr className="mt-16 mb-5 border-none bg-[#D8DCDF]/50 h-[2px]" />
          <div className="mt-10 w-full flex justify-around items-center gap-2 max-sm:flex-col">
            <div className="w-[28%] flex items-center gap-2 max-sm:text-xl">
              <span className="w-10 h-10 p-2 flex items-center justify-center border-2 border-white/50 rounded-full">
                <img src={icons.linkedin} alt="linkedin icon" />
              </span>
              <span className="w-10 h-10 p-2 flex items-center justify-center border-2 border-white/50 rounded-full">
                <img src={icons.facebook} alt="facebook icon" />
              </span>
              <span className="w-10 h-10 p-2 flex items-center justify-center border-2 border-white/50 rounded-full">
                <img src={icons.twitter} alt="twitter icon" />
              </span>
            </div>
            <div className="w-[28%] flex justify-center items-center gap-2 max-sm:w-full">
              <div className="flex justify-around items-center gap-5">
                <p className="text-white text-lg">A product of </p>
                <div className="flex items-center gap-2 text-white">
                  <img src={logos.main} width={20} alt="logo purple" />
                  <span className="font-bold text-lg">Validify</span>
                </div>
              </div>
            </div>
            <div className="w-[28%] flex justify-end items-center gap-2 max-sm:w-full max-sm:justify-center">
              <p className="text-white text-lg">
                © 2025 Validify. All rights reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
