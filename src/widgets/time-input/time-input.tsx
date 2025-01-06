import { Clock } from "lucide-react";
import React from "react";
interface TimeInputProps {
  containerStyles?: string | null;
  label?: string | null;
  fieldStyles?: string | null;
  value: string | null; // The current time value
  onChange: (value: string | null) => void; // Handler for when time changes
}

const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  label,
  fieldStyles,
  containerStyles,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value || null; // Convert empty string to null
    onChange(newValue);
  };

  return (
    <div className={`${containerStyles}`}>
      {label && (
        <label
          className="block text-sm font-medium text-gray-400 mb-1"
          htmlFor=""
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="time"
          value={value || ""} // Use empty string if value is null
          onChange={handleChange}
          className={`w-full bg-bgSecondary border-[1px] border-solid border-bgSecondary focus:border-primary text-white outline-0 rounded-lg pl-4 pr-8 py-2 transition-all  ${fieldStyles}`}
        />
        <Clock className="w-5 h-5 absolute right-[10px] top-[50%] translate-y-[calc(-50%)] " />
      </div>
    </div>
  );
};

export { TimeInput };
