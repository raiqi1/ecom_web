import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useField } from "formik";

export default function ShippingInput({ placeholder, ...props }) {
  const [field, meta] = useField(props);
  const [move, setMove] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (field?.value?.length > 0) {
      setMove(true);
    } else {
      setMove(false);
    }
  }, [field.value]);

  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error && styles.error__shipping
      }`}
    >
      <div
        className={styles.input__wrapper}
        onFocus={() => setMove(true)}
        onBlur={() => setMove(field?.value?.length > 0 ? true : false)}
      >
        <input {...field} {...props} type={field.type} ref={inputRef}  />
        <span
          className={move ? styles.move : ""}
          onClick={() => {
            inputRef.current.focus();
            setMove(true);
          }}
        >
          {placeholder}
        </span>
        <p>{meta.touched && meta.error && meta.error}</p>
      </div>
    </div>
  );
}
