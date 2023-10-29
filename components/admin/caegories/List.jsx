import React from "react";
import styles from "./styles.module.scss";
import ListItem from "./ListItem";

export default function List({ coupons, setCoupons }) {
  return (
    <ul className={styles.list}>
      {coupons.map((coupon) => (
        <ListItem
            key={coupon._id}
            coupon={coupon}
            setCoupons={setCoupons}
        />
      ))}
    </ul>
  );
}
