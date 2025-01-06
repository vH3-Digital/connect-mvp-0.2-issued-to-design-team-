import React, { useState } from "react";
import {
  Clock,
  MapPin,
  User,
  Calendar,
  ChevronRight,
  Wrench,
} from "lucide-react";
import { format, parseISO, differenceInMinutes } from "date-fns";
import { JobModal } from "./job-modal";
import { AnimatePresence } from "framer-motion";
import { IJobCard } from "../../../interfaces/interfaces";
import { Modal } from "../../../widgets/modal/modal";

export const JobCard: React.FC<IJobCard> = ({ job }) => {
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-400/20 text-green-400";
      case "completed with issues":
        return "bg-yellow-400/20 text-yellow-400";
      case "in progress":
        return "bg-blue-400/20 text-blue-400";
      default:
        return "bg-gray-400/20 text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy HH:mm");
  };

  const calculateTimeDifference = () => {
    if (!job.RealStart || !job.RealEnd) return null;

    const actualMinutes = differenceInMinutes(
      parseISO(job.RealEnd),
      parseISO(job.RealStart)
    );

    const plannedDuration = job.Duration.split(":");
    const plannedMinutes =
      parseInt(plannedDuration[0]) * 60 + parseInt(plannedDuration[1]);

    const difference = actualMinutes - plannedMinutes;
    const color = difference > 0 ? "text-red-400" : "text-green-400";

    return {
      actual: actualMinutes,
      planned: plannedMinutes,
      difference,
      color,
    };
  };

  const calculateStartDifference = () => {
    if (!job.RealStart || !job.PlannedStart) return null;

    const difference = differenceInMinutes(
      parseISO(job.RealStart),
      parseISO(job.PlannedStart)
    );

    const color = difference > 0 ? "text-red-400" : "text-green-400";

    return {
      difference,
      color,
    };
  };

  const timeDiff = calculateTimeDifference();
  const startDiff = calculateStartDifference();

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="group w-full mb-4 rounded-[12px] overflow-hidden sm:w-[calc(50%-20px)] 2xl:w-[calc(33.3%-20px)] sm:m-[10px] relative p-[1px] transition-all cursor-pointer"
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
        <div className="flex items-start justify-between p-4 bg-bgSecondary   relative h-full rounded-[12px]">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium truncate">{job.Ref}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                  job.Status
                )}`}
              >
                {job.Status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="w-4 h-4 text-primary" />
                <span className="truncate">{job.Contact}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="truncate">{job.Location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Wrench className="w-4 h-4 text-primary" />
                <span className="truncate">{job.Resource}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                {job.RealStart ? (
                  <>
                    <span className="text-gray-400">
                      Started: {formatDate(job.RealStart)}
                    </span>
                    {startDiff && (
                      <span className={startDiff.color}>
                        ({startDiff.difference > 0 ? "+" : ""}
                        {startDiff.difference} mins from planned)
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400">
                    Planned: {formatDate(job.PlannedStart)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                {timeDiff ? (
                  <>
                    <span className="text-gray-400">
                      Duration: {Math.floor(timeDiff.actual / 60)}:
                      {String(timeDiff.actual % 60).padStart(2, "0")}
                    </span>
                    <span className={timeDiff.color}>
                      ({timeDiff.difference > 0 ? "+" : ""}
                      {timeDiff.difference} mins from planned)
                    </span>
                  </>
                ) : (
                  <span className="text-gray-400">
                    Duration: {job.Duration}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                {job.Type}
              </span>
              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                {job.Category}
              </span>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <AnimatePresence>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={`Job Details - ${job.Ref}`}
          size="lg"
        >
          <JobModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            job={job}
          />
        </Modal>
      </AnimatePresence>
    </>
  );
};
