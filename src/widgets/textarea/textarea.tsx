import React from "react";

const Textarea = ({
  value,
  placeholder,
  label,
  rows,
  required,
  containerStyles,
  fieldStyles,
  onChange,
}: {
  value: string;
  placeholder: string;
  rows?: number;
  label?: string;
  required?: boolean | undefined;
  containerStyles?: string;
  fieldStyles?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className={` ${containerStyles}`}>
      {label && (
        <label className="block text-sm text-gray-400 mb-1">{label}</label>
      )}
      <textarea
        name=""
        required={required}
        rows={rows ? rows : 5}
        id=""
        value={value}
        onChange={onChange}
        className={`w-full resize-none bg-bgSecondary border-[1px] border-solid border-bgSecondary focus:border-primary text-white outline-0 rounded-lg px-4 py-2 transition-all  ${fieldStyles}`}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
export { Textarea };
