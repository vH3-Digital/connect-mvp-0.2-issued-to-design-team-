import React from "react";
import { motion } from "framer-motion";

const DocumentItemPlace = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className="bg-bgSecondary w-full mb-4 rounded-[12px] overflow-hidden sm:w-[calc(50%-20px)] 2xl:w-[calc(33.3%-20px)] sm:m-[10px] relative p-[1px] transition-all cursor-pointer"
    >
      <div className="rounded-[12px]  p-4 relative">
        <div className="flex items-start gap-4 ">
          <div className="p-3  rounded-xl placeholder w-[50px] h-[50px]"></div>
          <div className="flex-1 min-w-0">
            <h3 className="placeholder  w-[100%] min-h-[20px]"></h3>

            {/* Metadata */}
            <div className="space-y-2">
              <div className="placeholder w-[80%] min-h-[20px]"></div>

              <div className="placeholder w-[70%] min-h-[20px]"></div>

              <div className="placeholder w-[60%] min-h-[20px]"></div>
            </div>

            <p className="placeholder w-[100%] min-h-[18px]"></p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <div className="placeholder w-[calc(50%-4px)] min-h-[40px]"></div>
          <div className="placeholder w-[calc(50%-4px)] min-h-[40px]"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentItemPlace;
