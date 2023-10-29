import React, { useState } from "react";
import styles from "../styles.module.scss";

export default function Size({ size }) {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.filter__sizes_size}>
      <input type="checkbox" name="filter" id={size} />
      <label htmlFor={size}>{size}</label>
    </div>
  );
}
