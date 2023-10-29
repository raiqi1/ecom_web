import React from "react";
import styles from "../main/styles.module.scss";
import MainSwiper from "./swiper";
import Offer from "./offer";
import Menu from "./menu";
import User from "./User";
import Link from "next/link";
import Header from "./Header";

export default function Main() {
  return (
    <div className={styles.main}>
      <Header/>
      <Menu/>
      <MainSwiper />
      <Offer />
      <User/>
    </div>
  );
}
