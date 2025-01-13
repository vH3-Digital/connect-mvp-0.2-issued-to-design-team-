import { Search } from "lucide-react";
import React from "react";

const SearchField = ({
  value,
  placeholder,
  containerStyles,
  fieldStyles,
  onChange,
}: {
  value: string;
  placeholder: string;
  containerStyles?: string;
  fieldStyles?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={`relative ${containerStyles}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`w-full bg-bgSecondary border-[1px] border-solid border-bgSecondary focus:border-primary text-white outline-0 rounded-lg px-4 py-2 pl-[40px] transition-all  ${fieldStyles}`}
        placeholder={placeholder}
      />
    </div>
  );
};
export { SearchField };
