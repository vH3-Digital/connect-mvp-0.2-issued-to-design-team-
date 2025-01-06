import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Define the type for the list items
interface SelectItem {
  value: string;
}

// Define the props for the CustomSelect component
interface CustomSelectProps {
  containerStyles?: string | null;
  label?: string | null;
  fieldStyles?: string | null;
  onChange: (item: SelectItem) => void;
  selected: SelectItem | null;
  list: SelectItem[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  fieldStyles,
  containerStyles,
  onChange,
  selected,
  list,
}) => {
  const wrapper = useRef<HTMLDivElement | null>(null); // Ref for the dropdown wrapper
  const [active, setActive] = useState(false); // State to toggle dropdown visibility
  const [currentList, setCurrentList] = useState<SelectItem[]>(list); // Filtered list
  const [currentSelected, setCurrentSelected] = useState<SelectItem | null>(
    selected
  ); // Currently selected item

  const onClick = (item: SelectItem) => {
    setCurrentSelected(item); // Update selected item
    onChange(item); // Call the onChange callback
    setActive(false); // Close the dropdown
  };

  const toggleActive = () => {
    setActive((prev) => !prev); // Toggle dropdown visibility
  };

  // Update the filtered list when currentSelected changes
  useEffect(() => {
    setCurrentList(
      currentSelected
        ? list.filter((item) => item.value !== currentSelected.value)
        : list
    );
  }, [list, currentSelected]);

  // Sync selected prop with internal state
  useEffect(() => {
    setCurrentSelected(selected);
  }, [selected]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const windowClick = (e: MouseEvent) => {
      if (wrapper.current && !wrapper.current.contains(e.target as Node)) {
        setActive(false);
      }
    };

    if (active) {
      window.addEventListener("click", windowClick);
    }

    return () => {
      window.removeEventListener("click", windowClick);
    };
  }, [active]);

  return (
    <div className="relative w-full cursor-pointer" ref={wrapper}>
      <div
        className={`w-full flex items-center justify-between bg-bgSecondary border-[1px] border-solid border-bgSecondary  text-white outline-0 rounded-lg px-4 py-2 transition-all  ${
          active ? "border-primary" : ""
        }`}
        onClick={toggleActive}
      >
        {currentSelected ? currentSelected.value : "Select"}
        <ChevronDown className="w-5 h-5" />
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className="absolute top-[calc(100%+4px)] z-10 left-0 w-full bg-bgSecondary border-solid border-[1px] border-primary rounded-[6px]"
          >
            {currentList.map((item) => (
              <div
                className="p-4 text-[14px] first:rounded-t-[6px] transition-all cursor-pointer last:rounded-b-[6px] leading-[16px] text-white font-regular hover:bg-background  hover:text-primary"
                key={item.value}
                onClick={() => onClick(item)}
              >
                {item.value}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { CustomSelect };
