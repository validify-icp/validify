import logo from "../assets/images/logo.png";

import Button from "./Button";

const Navbar = () => {
  return (
    <header className="fixed z-[999] top-4 left-10 right-10 flex items-center justify-between border px-5 py-2 border-slate-200 rounded-lg bg-white/20 backdrop-blur-3xl">
      <div className="flex items-center gap-2">
        <img src={logo} width={30} alt="logo" />
        <span className="font-bold text-2xl text-white">Validify</span>
      </div>
      {true && (
        <nav>
          <ul>
            <li className="flex gap-8 text-white">
              <a href="#" className="font-bold">
                Verify
              </a>
              <a href="#">Generate</a>
              <a href="#">Validate</a>
            </li>
          </ul>
        </nav>
      )}
      {true && (
        <div className="flex items-center gap-2">
          <span className="bg-[#EFF3FA] px-2 py-2 text-black rounded-2xl">
            NA
          </span>
          <span className="text-white font-medium">Nadia Omara</span>
        </div>
      )}
      {false && (
        <div>
          <Button label="Make Certificate!" />
        </div>
      )}
    </header>
  );
};

export default Navbar;
