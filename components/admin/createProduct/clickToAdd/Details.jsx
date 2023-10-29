import React, { useState } from "react";
import styles from "./styles.module.scss";
import { sizesList } from "../../../../data/sizes";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

export default function Details({ details, product, setProduct, ...props }) {
  const [ukuran, setUkuran] = useState(false);

  const handleDetail = (i, e) => {
    const values = [...details];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, details: values });
  };
  const handleRemove = (i) => {
    if (details.length > 0) {
      const values = [...details];
      values.splice(i, 1);
      setProduct({ ...product, details: values });
    }
  };

  console.log("product details", product.details);

  return (
    <div>
      <div className={styles.header}>Details</div>
      {details.length === 0 && (
        <BsFillPatchPlusFill
        className={styles.svg}
          onClick={() => {
            setProduct({
              ...product,
              details: [...details, { name: "", value: "" }],
            });
          }}
        />
      )}
      {details
        ? details.map((d, i) => (
            <div key={i} className={styles.clicktoadd}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={d.name}
                onChange={(e) => handleDetail(i, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={d.value}
                onChange={(e) => handleDetail(i, e)}
              />
              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill
                  onClick={() => {
                    setProduct({
                      ...product,
                      details: [...details, { name: "", value: "" }],
                    });
                  }}
                />
              </>
            </div>
          ))
        : ""}
    </div>
  );
}
