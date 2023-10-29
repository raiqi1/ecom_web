import React from "react";
import styles from "./styles.module.scss";
import { paymentMethods } from "../../../data/paymentMethods";

export default function Payment({ paymentMethod, setPaymentMethod, profile }) {
  console.log("paymentMethod", paymentMethod);

  return (
    <div className={styles.payment}>
      {!profile && (
        <div className={styles.header}>
          <h3>Payment Method</h3>
        </div>
      )}
      {paymentMethods.map((method, index) => (
        <label
          className={styles.payment__item}
          onClick={() => setPaymentMethod(method.id)}
          htmlFor={method.id}
          key={index}
          style={{
            background: `${paymentMethod === method.id ? "#f5f5f5" : ""}`,
          }}
        >
          <input
            type="radio"
            name="payment"
            id={method.id}
            checked={paymentMethod === method.id}
            // onChange={() => setPaymentMethods(method.id)}
          />
          <img
            src={`../../../images/checkout/${method.id}.webp`}
            alt={method.id}
          />
          <div className={styles.payment__item_col}>
            <span>Pay With{method.name}</span>
            <p>
              {method.images.length > 0
                ? method.images.map((img, index) => (
                    <img
                      src={`../../../images/payment/${img}.webp`}
                      key={index}
                      alt=""
                    />
                  ))
                : method.description}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}
