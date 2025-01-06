import React from "react";
import styles from "./checkbox.module.scss";
const Checkbox = ({
  checked,
  required,
  boxStyles,
  onChange,
}: {
  checked: boolean;
  required?: boolean | undefined;
  boxStyles?: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles["checkbox"]}>
      <input
        required={required}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer checked:label `}
      />
      <label className={styles[`${boxStyles}`]} htmlFor=""></label>
    </div>
  );
};
export { Checkbox };
