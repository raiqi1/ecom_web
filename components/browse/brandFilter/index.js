import React, { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function BrandFilter({ brands }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.filter}>
      <h3>
        Brands{" "}
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
          {brands.map((brand, i) => (
            <button className={styles.filter__brand}>
              <img src={`../../../images/brands/${brand}.png`} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
