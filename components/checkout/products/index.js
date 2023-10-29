import React from "react";
import styles from "./styles.module.scss";

export default function Products({ cart }) {
  console.log("cart", cart);
  return (
    <div className={styles.products}>
      <div className={styles.products__header}>
        <h1>Cart</h1>
        <span>
          {cart.products.length === 1
            ? "1 items"
            : `${cart.products.length} items`}
        </span>
      </div>
      <div className={styles.products__wrap}>
        {cart.products.map((product, index) => (
          <div className={styles.product} key={index}>
            <div className={styles.product__img}>
              <img src={product.image} alt={product.name} />
              <div className={styles.product__infos}>
                <img src={product.color.image} alt="" />
                <span>{product.size}</span>
                <span>x{product.qty}</span>
              </div>
            </div>
            <div className={styles.product__name}>
              {product.name.length > 18
                ? product.name.slice(0, 18) + "..."
                : product.name}
            </div>
            <div className={styles.product__price}>
              <span>${(product.price * product.qty).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.products__total}>
        SubTotal : <b>{cart.cartTotal}$</b>
      </div>
    </div>
  );
}
