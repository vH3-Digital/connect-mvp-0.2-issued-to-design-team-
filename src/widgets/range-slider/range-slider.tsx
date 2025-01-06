import React from "react";
function RangeSlider({
  min,
  max,
  value,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  // const min = 0;
  // const max = 100;
  const style = (value - min) * (100 / (max - min));
  return (
    <div className="relative flex-1 h-[10px] bg-bgSecondary rounded-[50px]">
      <input
        type="range"
        // min={min}
        // max={max}
        step={'5'}
        value={value}
        onChange={onChange}
        className="absolute top-0 left-0 w-full h-full opacity-0 z-10 cursor-pointer "
      />
      <div
        style={{ width: style + "%" }}
        className="absolute top-0 left-0 h-full rounded-[30px] bg-gradient-to-r from-gradOne to-gradTwo transition-all"
      ></div>
      <div
        style={{ left: style + "%", transform: `translateX(-${style}%)` }}
        className="transition-all w-[20px] h-[20px] flex items-center justify-center rounded-[50px] bg-gradient-to-r from-gradOne to-gradTwo absolute top-[-6px] "
      >
        <span className="bg-white w-[14px] h-[14px]  rounded-[50px]"></span>
      </div>
    </div>
  );
}
export { RangeSlider };
