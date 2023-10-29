/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import HeaderCart from "../components/cart/header";
import styles from "../styles/cart.module.scss";
import Empty from "../components/cart/empty";
import { useDispatch, useSelector } from "react-redux";
import ProductCart from "../components/cart/product";
import CartHeader from "../components/cart/cartHeader";
import Checkout from "../components/cart/checkout";
import Payment from "../components/cart/paymentMethod";
import ProductSwiper from "../components/productsSwiper";
import { women_swiper } from "../data/home";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { updateCart } from "../store/cartSlice";
import { saveCart } from "../request/user";

export default function cart() {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => ({ ...state }));
  const { data: session } = useSession();
  const Router = useRouter();
  console.log("selected", selected);
  console.log("session", session);
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setShippingFee(
      selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
    );
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(
      selected
        .reduce((a, c) => a + c.price * c.qty + Number(c.shipping), 0)
        .toFixed(2)
    );
  }, [selected]);

  // useEffect(() => {
  //   const update = async () => {
  //     const { data } = await axios.post("/api/updateCart", {
  //       products: cart.cartItems,
  //     });
  //     dispatch(updateCart(data));
  //   };
  //   if (cart?.cartItems?.length > 0) {
  //     update();
  //   }
  // }, [dispatch]);

  const saveCartToDbHandler = async () => {
    if (session) {
      const res = saveCart(selected);
      Router.push("/checkout");
    } else {
      signIn();
    }
  };

  return (
    <>
      <HeaderCart />
      <div className={styles.cart}>
        {cart?.cartItems?.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart?.cartItems?.map((product) => (
                <ProductCart
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <Payment />
          </div>
        ) : (
          <Empty />
        )}

        <ProductSwiper products={women_swiper} />
      </div>
    </>
  );
}
