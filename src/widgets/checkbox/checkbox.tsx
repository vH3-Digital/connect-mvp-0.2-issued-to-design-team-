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
      />
      <label className={styles[`${boxStyles}`]} htmlFor=""></label>
    </div>
  );
};
export { Checkbox };
