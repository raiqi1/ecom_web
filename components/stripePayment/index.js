import React from "react";
import styles from "./styles.module.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Form from "./form";

export default function StripePayment({ total, stripe_public_key, order_id }) {
  const stripePromise = loadStripe(stripe_public_key);

  return <Elements stripe={stripePromise}>
    <Form
    total={total}
    order_id={order_id}
    />
  </Elements>;
}
