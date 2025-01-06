import { Calendar } from "lucide-react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./date-input.module.scss";
interface DateInputProps {
  containerStyles?: string | null;
  label?: string | null;
  fieldStyles?: string | null;
  value: Date | null; // Controlled value for the date
  onChange: (date: Date | null) => void; // Handler for date change
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  label,
  fieldStyles,
  containerStyles,
}) => {
  return (
    <div className={`w-full ${containerStyles}`}>
      {label && (
        <label
          className="block text-sm font-medium text-gray-400 mb-1"
          htmlFor=""
        >
          {label}
        </label>
      )}
      <div className={styles["date"]}>
        <DatePicker
          selected={value} // Controlled value
          onChange={onChange} // Pass the date change handler
          dateFormat="yyyy/MM/dd" // Specify the date format
          isClearable // Allow clearing the date
          className={`!w-full bg-bgSecondary border-[1px] border-solid border-bgSecondary focus:border-primary text-white outline-0 rounded-lg pl-4 pr-8 py-2 transition-all  ${fieldStyles}`}
          placeholderText="Select a date" // Placeholder text
        />
        <Calendar className="w-5 h-5 absolute right-[10px] top-[50%] translate-y-[calc(-50%)] " />
      </div>
    </div>
  );
};

export { DateInput };
