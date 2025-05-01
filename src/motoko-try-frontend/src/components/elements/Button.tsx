import { ReactNode } from "react";

interface ButtonProps {
  label?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ label, children, className = "", onClick }: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 text-white font-medium rounded-lg border border-[#a693f5] outline outline-white bg-gradient-to-t from-[#6240ED] to-[#917AF2] shadow-md cursor-pointer hover:bg-gradient-to-b hover:from-[#6240ED] hover:to-[#917AF2]";

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`}>
      {children || label || "Button"}
    </button>
  );
};

export default Button;
