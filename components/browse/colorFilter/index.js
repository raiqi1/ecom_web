import React, { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function ColorFilter({ colors }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.filter}>
      <h3>
        Colors{" "}
        <span>
          {show ? (
            <FaMinus onClick={() => setShow(!show)} />
          ) : (
            <BsPlusLg onClick={() => setShow(!show)} />
          )}
        </span>
      </h3>
      {show && (
        <div className={styles.filter__colors}>
          {colors.map((c, i) => (
            <button key={i} style={{ background: `${c}` }}></button>
          ))}
        </div>
      )}
    </div>
  );
}
