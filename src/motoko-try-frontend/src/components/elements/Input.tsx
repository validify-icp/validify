interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  className?: string;
}

const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
  className,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${"border-2 border-slate-200 w-full px-4 py-3 text-sm rounded-md focus:border-slate-300 hover:border-slate-300 focus:outline-none focus:outline-offset-2"} ${className}`}
    />
  );
};

export default Input;
