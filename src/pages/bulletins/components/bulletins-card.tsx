import React, { Dispatch, SetStateAction } from "react";
import { IBulletin } from "../../../interfaces/interfaces";
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Users,
} from "lucide-react";
import { format } from "date-fns";

export default function BulletinsCard({
  itemData,
  setSelectedBulletin,
}: {
  itemData: IBulletin;
  setSelectedBulletin: Dispatch<SetStateAction<IBulletin | null>>;
}) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yy");
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400";
      case "review":
        return "text-yellow-400";
      case "scheduled":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-400/20 text-red-400";
      case "medium":
        return "bg-yellow-400/20 text-yellow-400";
      case "low":
        return "bg-green-400/20 text-green-400";
      default:
        return "bg-gray-400/20 text-gray-400";
    }
  };
  return (
    <div
      key={itemData.id}
      onClick={() => setSelectedBulletin(itemData)}
      className="group relative p-[1px] overflow-hidden transition-all cursor-pointer"
    >
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
      <div className="bg-bgSecondary p-[16px] sm:p-[24px] md:p-[32px] relative rounded-[12px]">
        <div className="flex flex-col  md:flex-row md:items-start md:justify-between">
          <div className="flex items-start flex-col  sm:flex-row order-2 md:order-1">
            <div className="p-2 bg-gray-700 rounded-lg mb-[10px] sm:mb-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="sm:flex-1 sm:ml-2">
              <div className=" gap-3">
                <h3 className="font-medium">{itemData.title}</h3>
                <span
                  className={`text-sm ${getStatusColor(
                    itemData.status
                  )} capitalize`}
                >
                  • {itemData.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-sm text-gray-400">ID: {itemData.id}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-400">
                  Updated: {formatDate(itemData.updatedAt)}
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-400">
                  Assigned to: {itemData.assignedTo}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {itemData.categories?.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                  >
                    {category}
                  </span>
                ))}
                {itemData.followUpDays && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {itemData.followUpDays}d follow-up
                  </span>
                )}
                {itemData.passRate && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {itemData.passRate}% pass rate
                  </span>
                )}
                {itemData.engineers && (
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {itemData.engineers.length} engineers
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 order-1 mb-4 md:order-2" >
            <span
              className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(
                itemData.priority
              )}`}
            >
              {itemData.priority}
            </span>
            {itemData.scheduledDate && (
              <span className="flex items-center gap-1 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                {formatDate(itemData.scheduledDate)}
              </span>
            )}
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white">Progress</span>
            <span className="text-primary">{itemData.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gradOne to-gradTwo"
              style={{ width: `${itemData.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
