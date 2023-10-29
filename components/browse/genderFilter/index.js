import React, { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function GenderFilter({}) {
  const genders = ["Men", "Women", "Kid"];
  const [show, setShow] = useState(false);

  return (
    <div className={styles.filter}>
      <h3>
        Gender{" "}
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
          {genders.map((gender, i) => (
            <div key={i} className={styles.filter__sizes_size}>
              <input type="checkbox" name="gender" id={gender} />
              <label htmlFor={gender}>{gender}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
