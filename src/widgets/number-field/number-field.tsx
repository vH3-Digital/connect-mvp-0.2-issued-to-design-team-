import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const NumberField = ({
  value,
  placeholder,
  label,
  type,
  required,
  containerStyles,
  fieldStyles,
  onChange,
}: {
  value: number;
  placeholder: string;
  label?: string;
  required?: boolean | undefined;
  type: string;
  containerStyles?: string;
  fieldStyles?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [numValue, setNumValue] = useState<number>(value);
  const incriment = () => {
    if (numValue <= 9) {
      setNumValue(numValue + 1);
      console.log("clicked", numValue);
    }
  };
  const descrement = () => {
    if (numValue !== 0) {
      setNumValue(numValue - 1);
      console.log("clicked", numValue);
    }
  };
  return (
    <div className={` ${containerStyles}`}>
      {label && (
        <label className="block text-sm text-gray-400 mb-1">{label}</label>
      )}
      <div className="relative">
        <input
          required={required}
          type={type}
          value={numValue}
          onChange={onChange}
          className={`w-full bg-bgSecondary border-[1px] border-solid border-bgSecondary focus:border-primary text-white outline-0 rounded-lg pl-4 pr-8 py-2 transition-all  ${fieldStyles}`}
          placeholder={placeholder}
        />
        <div className="absolute flex flex-col top-[50%] translate-y-[calc(-50%)] right-[10px]">
          <button
            type="button"
            className="opacity-50 hover:opacity-100 transition-all"
            onClick={incriment}
          >
            <ChevronUp className="w-4 h-4 " />
          </button>
          <button
            type="button"
            className="opacity-50 hover:opacity-100 transition-all"
            onClick={descrement}
          >
            <ChevronDown className="w-4 h-4 " />
          </button>
        </div>
      </div>
    </div>
  );
};
export { NumberField };
