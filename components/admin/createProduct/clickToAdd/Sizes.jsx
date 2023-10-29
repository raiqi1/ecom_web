import React, { useState } from "react";
import styles from "./styles.module.scss";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { sizesList } from "../../../../data/sizes";

export default function Sizes({ sizes, product, setProduct, ...props }) {
  const [ukuran, setUkuran] = useState(false);

  const handleSize = (i, e) => {
    const values = [...sizes];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, sizes: values });
  };
  const handleRemove = (i) => {
    if (sizes.length > 1) {
      const values = [...sizes];
      values.splice(i, 1);
      setProduct({ ...product, sizes: values });
    }
  };

  console.log("product sizes", product.sizes);

  return (
    <div>
      <div className={styles.header}>Sizes / Quantity / Price</div>
      <button
        type="reset"
        className={`${styles.click_btn} ${ukuran ? styles.ukuran : styles.nosize }`}
        onClick={() => {
          if (!ukuran) {
            let data = sizes.map((p) => {
              return {
                qty: p.qty,
                price: p.price,
              };
            });
            setProduct({ ...product, sizes: data });
          } else {
            let data = sizes.map((p) => {
              return {
                size: p.size || "",
                qty: p.qty,
                price: p.price,
              };
            });
            setProduct({ ...product, sizes: data });
          }
            setUkuran(!ukuran);
        }}
      >
        {ukuran
          ? "Click jika product tidak ada size"
          : "click jika product sudah ada size"}
      </button>
      {sizes
        ? sizes.map((size, i) => (
            <div key={i} className={styles.clicktoadd}>
              <select
                name="size"
                value={ukuran ? "" : size.size}
                disabled={ukuran}
                style={{ display: `${ukuran ? "none" : ""}` }}
                onChange={(e) => handleSize(i, e)}
              >
                <option value="">Select a Size</option>
                {sizesList.map((s, k) => (
                  <option key={k} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="qty"
                placeholder={ukuran ? "Product Quantiry" : " Size Quantity"}
                value={size.qty}
                min={1}
                onChange={(e) => handleSize(i, e)}
              />
              <input
                type="number"
                name="price"
                placeholder={ukuran ? "Product Price" : " Size Price"}
                value={size.price}
                min={1}
                onChange={(e) => handleSize(i, e)}
              />
              {!ukuran ? (
                <>
                  <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                  <BsFillPatchPlusFill
                    onClick={() => {
                      setProduct({
                        ...product,
                        sizes: [...sizes, { size: "", qty: "", price: "" }],
                      });
                    }}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          ))
        : ""}
    </div>
  );
}
