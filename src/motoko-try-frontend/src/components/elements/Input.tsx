interface InputProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  className?: string;
}

const Input = ({
  id,
  placeholder,
  value,
  onChange,
  type = "text",
  className,
}: InputProps) => {
  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${"border-2 border-slate-200 w-full px-4 py-3 text-sm rounded-md focus:border-slate-300 focus:bg-slate-100 hover:border-slate-300 hover:bg-slate-100 focus:outline-none focus:outline-offset-2"} ${className}`}
    />
  );
};

export default Input;
