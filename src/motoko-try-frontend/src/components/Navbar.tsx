import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Button from "./Button";

import { logos } from "../constants";

const Navbar = ({ logo_color = "text-white", menu_color = "text-white" }) => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 10) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed z-[999] top-4 left-20 right-20 flex items-center justify-between border px-5 py-2 border-slate-200 rounded-lg bg-white/20 backdrop-blur-3xl">
      <NavLink to="/" className="flex items-center gap-2">
        {logo_color === "text-white" && (
          <img
            src={isScroll ? logos.main_purple : logos.main}
            width={30}
            alt="logo"
          />
        )}
        {logo_color !== "text-white" && (
          <img src={logos.main_purple} width={30} alt="logo" />
        )}
        <span
          className={`font-bold text-2xl ${
            isScroll ? "text-[#653FFF]" : logo_color
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
                to="/verify"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                Verify
              </NavLink>
            </li>
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
