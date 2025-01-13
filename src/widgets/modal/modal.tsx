import React, { useEffect } from "react";
import { X } from "lucide-react";
import { IModal } from "../../interfaces/interfaces";
import { AnimatePresence, motion } from "framer-motion";

export const Modal: React.FC<IModal> = ({
  isOpen,
  onClose,
  title,
  children,
  text,
  size = "md",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-3xl",
    xlg: "min-h-full max-w-[100%]",
  };
  const closeFunc = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target && onClose) {
      onClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    }
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, y: 10 }}
      onClick={closeFunc}
      className="fixed top-0 left-0 w-full h-full inset-0 bg-black/50 flex items-center justify-center z-50 sm:p-4 overflow-y-auto"
    >
      <div
        className={`bg-background rounded-xl w-full ${sizeClasses[size]} m-auto flex flex-col relative`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            {text && <p>{text}</p>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </motion.div>
  );
};
