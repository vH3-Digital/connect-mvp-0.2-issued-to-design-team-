import React from "react";

const CustomButton = ({
  title,
  onClick,
  extraStyles,
}: {
  title: string;
  onClick: () => void;
  extraStyles: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 bg-gradient-to-r from-gradOne to-gradTwo text-white rounded-lg hover:from-gradTwo hover:to-gradOne transition-all ${extraStyles}`}
    >
      {title}
    </button>
  );
};
export { CustomButton };
