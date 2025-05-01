import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Button from "../elements/Button";

import { logos } from "../../constants";

const Navbar = ({ logo_color = "text-white", menu_color = "text-white" }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [isLogoChange, setIsLogoChange] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setIsScroll(y >= 10);
      setIsLogoChange(y >= 600);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed z-[111] top-4 left-20 right-20 flex items-center justify-between border px-5 py-2 border-slate-200 rounded-lg bg-white/20 backdrop-blur-3xl">
      <NavLink to="/" className="flex items-center gap-2">
        {logo_color === "text-white" && (
          <img
            src={isLogoChange ? logos.main_purple : logos.main}
            width={30}
            alt="logo"
          />
        )}
        {logo_color !== "text-white" && (
          <img src={logos.main_purple} width={30} alt="logo" />
        )}
        <span
          className={`font-bold text-2xl ${
            isLogoChange ? "text-[#653FFF]" : logo_color
          }`}
        >
          Validify
        </span>
      </NavLink>
      {true && (
        <nav>
          <ul
            className={`flex gap-8 text-base ${
              isScroll ? "text-black" : menu_color
            }`}
          >
            <li className="group">
              <NavLink
                to="/generate"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Generate
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/validate"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Validate
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Register Certificate
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {true && (
        <div className="flex items-center gap-2">
          <span className="bg-[#EFF3FA] px-2 py-2 text-black rounded-2xl">
            NA
          </span>
          <span
            className={`font-medium ${isScroll ? "text-black" : menu_color}`}
          >
            Nadia Omara
          </span>
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
