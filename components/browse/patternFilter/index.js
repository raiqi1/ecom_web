import React, { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function PatternFilter({ pattern }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.filter}>
      <h3>
        Patterns{" "}
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
          {pattern.map((patterns, i) => (
            <div key={i} className={styles.filter__sizes_size}>
              <input type="checkbox" name="patterns" id={patterns} />
              <label htmlFor={patterns}>
                {patterns.length > 12
                  ? `${patterns.substring(0, 12)}...`
                  : `${patterns}`}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
