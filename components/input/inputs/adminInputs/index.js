import React from "react";
import styles from "./styles.module.scss";
import { ErrorMessage, useField } from "formik";

export default function AdminInput({ label, placeholder, ...rest }) {
  const [field, meta] = useField(rest);

  return (
    <div>
      <label
        className={`${styles.label} ${
          meta.touched && meta.error ? styles.inputError : ""
        }`}
      >
        <span>{label}</span>
        <input
          type={field.type}
          placeholder={placeholder}
          name={field.name}
          {...field}
          {...rest}
        />
      </label>
      {meta.touched && meta.error && (
        <div className={styles.inputError__msg}>
          <span></span>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
