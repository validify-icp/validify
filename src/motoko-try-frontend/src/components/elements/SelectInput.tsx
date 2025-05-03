import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  options: Option[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
}

const SelectInput = ({
  options,
  value,
  onChange,
  placeholder = "Choose template",
  className,
}: SelectInputProps) => {
  return (
    <div className={`flex flex-col gap-1`}>
      <select
        value={value}
        onChange={onChange}
        className={`border-2 border-slate-200 w-full px-4 py-2 text-sm rounded-md focus:outline-none hover:border-slate-300 hover:bg-slate-100 focus:border-slate-300 focus:bg-slate-100 ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
