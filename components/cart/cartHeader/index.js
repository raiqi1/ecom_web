import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { compareArrays } from "../../../pages/utils/arrays_utils";

export default function CartHeader({ cartItems, selected, setSelected }) {
  const [active, setActive] = useState();
  useEffect(() => {
    const check = compareArrays(cartItems, selected);
    setActive(check);
  }, [selected]);

  const handleSelect = () => {  
    if (selected.length !== cartItems.length) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };

  return (
    <div className={`${styles.cart__header} ${styles.card}`}>
      <h1>Item Summary ({cartItems.length})</h1>
      <div className={styles.flex} onClick={() => handleSelect()}>
        <button
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
        ></button>
        <span>Select All items</span>
      </div>
    </div>
  );
}
