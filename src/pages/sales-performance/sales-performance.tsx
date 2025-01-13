import React, { useState } from "react";
import { useSalesData } from "../../hooks/useSalesData";
import { QuotesList } from "./components/quote-list";
import { SalesByCategory } from "./components/sales-by-category";
import { TopPerformers } from "./components/top-performers";
import { SalesChart } from "./components/sales-chart";
import { SalesMetrics } from "./components/sales-metrics";
import { SalesOverview } from "./components/sales-overview";
import { DateRangeSelector } from "./components/date-range-selector";
import { motion } from "framer-motion";

export const SalesPerformance: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>("this_quarter");
  const [activeTab, setActiveTab] = useState<"overview" | "quotes">("overview");
  const { data, loading, error } = useSalesData(selectedRange);

  return (
    <div className="">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-[20px]">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-[10px]">
            Sales Performance
          </h2>
          <p className="text-white"> Real-time sales analytics and insights</p>
        </div>
        <DateRangeSelector
          selectedRange={selectedRange}
          onRangeChange={setSelectedRange}
        />
      </div>

      {/* Tabs */}
      <div className="flex mb-[20px] border-b border-gray-800">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("quotes")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === "quotes"
              ? "border-primary text-primary"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Quotes
        </button>
      </div>
      {/* Loading State */}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 mb-[20px]">
          {typeof error === "string" ? error : "An unexpected error occurred."}
        </div>
      )}

      {/* Sales Data */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          className=""
        >
          <div className="flex flex-wrap mx-[-10px] mb-[20px]">
            {[0, 1, 2, 3].map((item, index) => (
              <div
                key={index}
                className={`bg-bgSecondary  min-h-[120px] rounded-[8px] m-[10px] w-[calc(100%-20px)] sm:w-[calc(50%-20px)] xl:w-[calc(25%-20px)]  `}
              >
                <div className="w-full h-full placeholder"></div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="lg:flex lg:justify-between">
            {/* Left Column */}
            <div className="lg:w-[calc(100%-350px)] xl:w-[calc(100%-420px)]">
              <div className="bg-bgSecondary rounded-[12px] w-full  h-[300px] mb-[20px]">
                <div className="w-full h-full placeholder"></div>
              </div>
              <div className=" bg-bgSecondary rounded-[12px]  h-[300px] mb-[20px] md:mb-0">
                <div className="w-full h-full placeholder"></div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-[330px] xl:w-[400px]">
              <div className="bg-bgSecondary rounded-[12px] w-full h-[300px] mb-[20px]">
                <div className="w-full h-full placeholder"></div>
              </div>
              <div className="bg-bgSecondary rounded-[12px] w-full h-[300px]">
                <div className="w-full h-full placeholder"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
        >
          {data ? (
            <>
              {activeTab === "overview" && (
                <div className="">
                  {/* Overview Cards */}
                  <SalesOverview totals={data.totals} />

                  {/* Charts Grid */}
                  <div className="lg:flex lg:justify-between">
                    {/* Left Column */}
                    <div className="lg:w-[calc(100%-350px)] xl:w-[calc(100%-420px)]">
                      <SalesChart data={data.related_sales_opportunities} />
                      <SalesByCategory
                        data={data.related_sales_opportunities}
                      />
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-[330px] xl:w-[400px]">
                      <SalesMetrics data={data.related_sales_opportunities} />
                      <TopPerformers data={data.related_sales_opportunities} />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "quotes" && (
                <QuotesList quotes={data.related_sales_opportunities} />
              )}
            </>
          ) : (
            !loading && (
              <div className="text-center text-gray-400">
                No data available for the selected range.
              </div>
            )
          )}
        </motion.div>
      )}
    </div>
  );
};
