import { ReactNode } from "react";

interface ButtonProps {
  label?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  label,
  children,
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) => {
  const enabledClasses =
    "bg-gradient-to-t from-[#6240ED] to-[#917AF2] hover:bg-gradient-to-b hover:from-[#6240ED] hover:to-[#917AF2] cursor-pointer";
  const disabledClasses =
    "!bg-slate-200 !text-gray-400 !border-slate-200 !outline-none cursor-not-allowed";

  const baseClasses =
    "px-4 py-2 text-white font-medium rounded-lg border border-[#a693f5] outline outline-white shadow-md";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${
        disabled ? disabledClasses : enabledClasses
      } ${className} cursorno`}
      disabled={disabled}
    >
      {children || label || "Button"}
    </button>
  );
};

export default Button;
