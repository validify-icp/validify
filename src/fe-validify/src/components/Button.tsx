const Button = ({ label }: { label: string }) => {
  return (
    <button className="px-4 py-2 text-white font-medium rounded-lg border border-[#a693f5] outline outline-white bg-linear-to-t from-[#6240ED] to-[#917AF2] shadow-md cursor-pointer">
      {label}
    </button>
  );
};

export default Button;
