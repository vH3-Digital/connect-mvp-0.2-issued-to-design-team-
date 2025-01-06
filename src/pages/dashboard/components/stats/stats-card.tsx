import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { IDashboardStatsCard } from "../../../../interfaces/interfaces";

export const StatsCard: React.FC<IDashboardStatsCard> = ({
  title,
  value,
  trend,
}) => {
  return (
    <div className={"group relative p-[1px] overflow-hidden"}>
      <div
        className={
          "rounded-[12px] top-[0] left-[0]  duration-500 transition-all group-hover:rotate-180   w-full h-full absolute bg-gradient-to-br from-gradOne   to-bgSecondary/0 to-20%"
        }
      ></div>
      <div
        className={
          "rounded-[12px] top-[0] left-[0]  duration-500 transition-all group-hover:rotate-180   w-full h-full absolute bg-gradient-to-br from-bgSecondary/0   to-gradTwo from-80%"
        }
      ></div>
      <div className="bg-bgSecondary p-[32px] relative rounded-[12px]">
        <div className="relative z-10">
          <h3 className="text-sm text-gray-200 mb-4">{title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold">{value}</span>
            <span
              className={`${
                trend === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {trend === "up" ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
