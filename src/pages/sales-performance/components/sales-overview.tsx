import React from "react";
import { TrendingUp, Users, ShoppingBag, PieChart } from "lucide-react";

interface SalesOverviewProps {
  totals: {
    number_of_deals: number;
    total_value_of_deals: number;
    total_cost_of_deals: number;
    total_profit_of_deals: number;
  };
}

export const SalesOverview: React.FC<SalesOverviewProps> = ({ totals }) => {
  const cards = [
    {
      title: "Total Deals",
      value: totals.number_of_deals,
      icon: ShoppingBag,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Total Value",
      value: `£${totals.total_value_of_deals.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
      })}`,
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Total Profit",
      value: `£${totals.total_profit_of_deals.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
      })}`,
      icon: PieChart,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Profit Margin",
      value: `${(
        (totals.total_profit_of_deals / totals.total_value_of_deals) *
        100
      ).toFixed(1)}%`,
      icon: Users,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="flex flex-wrap mx-[-10px] mb-[20px]">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`p-[1px] rounded-[8px] m-[10px] w-[calc(100%-20px)] sm:w-[calc(50%-20px)] xl:w-[calc(25%-20px)] relative overflow-hidden group  transition-transform cursor-pointer`}
        >
          <div
            className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${card.color} `}
          ></div>
          <div className="relative z-10 p-6 bg-bgSecondary/90 rounded-[8px] h-full hover:bg-bgSecondary transition-all">
            <div className="flex items-center gap-3 mb-4">
              <card.icon className="w-6 h-6 text-white" />
              <h3 className="text-sm text-white/90">{card.title}</h3>
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
      ))}
    </div>
  );
};
