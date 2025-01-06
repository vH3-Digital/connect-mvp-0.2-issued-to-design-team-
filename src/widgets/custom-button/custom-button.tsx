import React, { ReactElement } from "react";

const CustomButton = ({
  title,
  onClick,
  extraStyles,
  icon,
  styleType,
}: {
  title: string;
  onClick: () => void;
  extraStyles?: string | null;
  icon?: ReactElement | null;
  styleType?: string | null;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 hover:opacity-[.8] transition-all rounded-[8px] flex items-center ${
        styleType === "gray" && "bg-gray-700 text-white"
      } ${
        styleType === "primary" &&
        "bg-gradient-to-r from-gradOne to-gradTwo text-white rounded-lg hover:from-gradTwo hover:to-gradOne transition-all"
      } ${extraStyles}`}
    >
      {icon && icon}
      <span>{title}</span>
    </button>
  );
};
export { CustomButton };
