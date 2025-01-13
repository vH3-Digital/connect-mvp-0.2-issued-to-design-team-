import React from "react";
import { FileText, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { SalesOpportunity } from "../../../types/sales";

interface QuotesListProps {
  quotes: SalesOpportunity[];
}

export const QuotesList: React.FC<QuotesListProps> = ({ quotes }) => {
  if (!quotes?.length) {
    return (
      <div className="text-center py-12 text-gray-400">No quotes available</div>
    );
  }

  const formatCurrency = (value?: number) => {
    if (typeof value !== "number") return "0.00";
    return value.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (outcome?: string) => {
    if (!outcome) return "bg-gray-500/20 text-gray-400";
    const status = outcome.toLowerCase();
    if (status.includes("accepted")) return "bg-green-500/20 text-green-400";
    if (status.includes("rejected") || status.includes("refused"))
      return "bg-red-500/20 text-red-400";
    return "bg-yellow-500/20 text-yellow-400";
  };

  return (
    <div className="">
      {quotes.map((quote, index) => (
        <div
          key={index}
          className="group w-full mb-5 last:mb-0 rounded-[12px] overflow-hidden relative p-[1px] transition-all cursor-pointer"
        >
          <div
            className={
              "rounded-[12px] top-[0] left-[0]  duration-500 transition-all group-hover:rotate-180  w-full h-full absolute bg-gradient-to-br from-gradOne  to-bgSecondary/0 to-20%"
            }
          ></div>
          <div
            className={
              "rounded-[12px] top-[0] left-[0] duration-500 transition-all group-hover:rotate-180  w-full h-full absolute bg-gradient-to-br from-bgSecondary/0   to-gradTwo from-80%"
            }
          ></div>
          <div className="flex flex-col md:flex-row items-start justify-between  p-4 bg-bgSecondary relative h-full rounded-[12px]">
            <div className="flex items-start flex-col sm:space-x-4 sm:flex-row">
              <div className="p-2 bg-gray-700 rounded-lg mb-[10px]">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3">
                  <h3 className="font-medium">
                    {quote.title || "Untitled Quote"}
                  </h3>
                  {quote.quote_ref && (
                    <span className="text-sm text-primary">
                      {quote.quote_ref}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quote.Customer && (
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{quote.Customer}</span>
                    </div>
                  )}
                  {quote.created_date && (
                    <>
                      <span className="text-gray-600">•</span>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(quote.created_date)}</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {quote.department && (
                    <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                      {quote.department}
                    </span>
                  )}
                  {quote.lead_source && (
                    <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                      {quote.lead_source}
                    </span>
                  )}
                  {quote.outcome && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        quote.outcome
                      )}`}
                    >
                      {quote.outcome}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="md:text-right mt-[20px] md:mt-0">
              <div className="text-primary text-xl font-medium">
                £{formatCurrency(quote.value_inc_vat)}
              </div>
              {typeof quote.profit === "number" && (
                <div className="text-gray-500 mt-1">
                  £{formatCurrency(quote.profit)} profit
                </div>
              )}
              {quote.issued_by && (
                <div className="text-sm text-gray-400 mt-2">
                  By: {quote.issued_by}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
