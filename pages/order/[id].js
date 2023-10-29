import React, { useEffect, useReducer } from "react";
import styles from "../../styles/order.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Order from "../../models/Order";
import { IoIosArrowForward } from "react-icons/io";
import db from "../utils/db";
import User from "../../models/User";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import StripePayment from "../../components/stripePayment";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "PAY_REQUEST":
      return { ...state, loading: true };
    case "PAY_SUCCESS":
      return { ...state, loading: false, success: true };
    case "PAY_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_RESET":
      return { ...state, loading: false, success: false, error: false };
    default:
      return state;
  }
}

export default function order({
  orderData,
  paypal_client_id,
  stripe_public_key,
}) {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [{ loading, error, success }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    if (!orderData._id || success) {
      if (success) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypal_client_id,
          currency: "USD",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: "pending",
      });
    }
  }, [order, success]);

  function createOrderHandler(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: orderData.total,
            },
          },
        ],
      })
      .then((order_id) => {
        return order_id;
      });
  }

  function onApproveHandler(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(`/api/order/${orderData._id}/pay`, {
          details,
          order_id: orderData._id,
        });
        dispatch({ type: "PAY_SUCCESS", payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: "PAY_FAIL", payload: error.message });
      }
    });
  }
  const onErrorHandler = () => {};

  return (
    <>
      <Header country="country" />
      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__infos}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Home <IoIosArrowForward /> Orders <IoIosArrowForward /> ID{" "}
                {orderData._id}
              </div>
              <div className={styles.order__header_status}>
                Payment Status :{" "}
                {orderData.isPaid ? (
                  <img src="../../../images/verified.png" alt="" />
                ) : (
                  <img src="../../../images/unverified.png" alt="" />
                )}
              </div>
              <div className={styles.order__header_status}>
                Order Status :
                <span
                  className={
                    orderData.status === "Not Processing"
                      ? styles.not_processed
                      : orderData.status === "Processing"
                      ? styles.processing
                      : orderData.status === "Dispatched"
                      ? styles.dispatched
                      : orderData.status === "Cancelled"
                      ? styles.cancelled
                      : orderData.status === "Completed"
                      ? styles.completed
                      : ""
                  }
                >
                  {orderData.status}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {orderData.products.map((product, index) => (
                <div className={styles.product} key={index}>
                  <div className={styles.product__img}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className={styles.product__infos}>
                    <h1 className={styles.product__infos_name}>
                      {product.name.length > 20
                        ? product.name.slice(0, 20) + "..."
                        : product.name}
                    </h1>
                    <div className={styles.product__infos_style}>
                      <img src={product.color.image} alt="" /> / {product.size}
                    </div>
                    <div className={styles.product__infos_priceQty}>
                      {product.price}$ x {product.qty}
                    </div>
                    <div className={styles.product__infos_total}>
                      {product.price * product.qty}$
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.order__products_total}>
                {orderData.couponAplied ? (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Subtotal</span>
                      <span>{orderData.totalBeforeDiscount}$</span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>
                        Coupon Applied <em>({orderData.couponAplied})</em>
                      </span>
                      <span>
                        -
                        {(
                          orderData.totalBeforeDiscount - orderData.total
                        ).toFixed(2)}
                        $
                      </span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>Tax Price : </span>
                      <span>{orderData.taxPrice}$</span>
                    </div>
                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>TOTAL : </span>
                      <span>{orderData.total}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Tax Price : </span>
                      <span>{orderData.taxPrice}$</span>
                    </div>
                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>TOTAL : </span>
                      <span>{orderData.total}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.order__actions}>
            <div className={styles.order__address}>
              <h1>Customer's Order</h1>
              <div className={styles.order__address_user}>
                <div className={styles.order__address_user_infos}>
                  <img src={orderData.user.image} alt="" />
                  <div>
                    <span>{orderData.user.name}</span>
                    <span>{orderData.user.email}</span>
                  </div>
                </div>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Shipping Address</h2>
                <span>
                  {orderData.shippingAddress.firstName}{" "}
                  {orderData.shippingAddress.lastName}
                </span>
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.state},
                  {orderData.shippingAddress.city}
                </span>
                <span>{orderData.shippingAddress.country}</span>
                <span>{orderData.shippingAddress.zipCode}</span>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Billing Address</h2>
                <span>
                  {orderData.shippingAddress.firstName}{" "}
                  {orderData.shippingAddress.lastName}
                </span>
                <span>{orderData.shippingAddress.address1}</span>
                <span>{orderData.shippingAddress.address2}</span>
                <span>
                  {orderData.shippingAddress.state},
                  {orderData.shippingAddress.city}
                </span>
                <span>{orderData.shippingAddress.country}</span>
                <span>{orderData.shippingAddress.zipCode}</span>
              </div>
            </div>
            {!orderData.isPaid && (
              <div className={styles.order__payment}>
                {orderData.paymentMethod === "paypal" && (
                  <div>
                    {isPending ? (
                      <span>loading...</span>
                    ) : (
                      <PayPalButtons
                        createOrder={createOrderHandler}
                        onApprove={onApproveHandler}
                        onError={onErrorHandler}
                      ></PayPalButtons>
                    )}
                  </div>
                )}
                {orderData.paymentMethod === "credit_card" && (
                  <StripePayment
                    total={orderData.total}
                    order_id={orderData._id}
                    stripe_public_key={stripe_public_key}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  const { query } = context;
  const { id } = query;
  const order = await Order.findById(id)
    .populate({ path: "user", model: User })
    .lean();
  let paypal_client_id = process.env.PAYPAL_CLIENT_ID;
  let stripe_public_key = process.env.STRIPE_PUBLIC_KEY;
  console.log("paypal_client_id", paypal_client_id);
  console.log("order", order);
  db.disconnectDb();
  return {
    props: {
      orderData: JSON.parse(JSON.stringify(order)),
      paypal_client_id,
      stripe_public_key,
    },
  };
}
