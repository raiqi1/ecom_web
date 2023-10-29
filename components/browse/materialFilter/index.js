import React, { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function MaterialFilter({ materials }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.filter}>
      <h3>
        Materials{" "}
        <span>
          {show ? (
            <FaMinus onClick={() => setShow(!show)} />
          ) : (
            <BsPlusLg onClick={() => setShow(!show)} />
          )}
        </span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {materials.map((material, i) => (
            <div key={i} className={styles.filter__sizes_size}>
              <input type="checkbox" name="material" id={material} />
              <label htmlFor={material}>{material}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
