import React from "react";

const FormField = ({
  value,
  placeholder,
  label,
  type,
  required,
  containerStyles,
  fieldStyles,
  onChange,
}: {
  value: string;
  placeholder: string;
  label?: string;
  required?: boolean | undefined;
  type: string;
  containerStyles?: string;
  fieldStyles?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={` ${containerStyles}`}>
      {label && (
        <label className="block text-sm text-gray-400 mb-1">{label}</label>
      )}
      <input
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full bg-bgSecondary border-[1px] border-solid border-bgSecondary focus:border-primary text-white outline-0 rounded-lg px-4 py-2 transition-all  ${fieldStyles}`}
        placeholder={placeholder}
      />
    </div>
  );
};
export { FormField };
