import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { getSession, useSession } from "next-auth/react";

export default function Main() {
  const { data: session } = useSession();
  console.log("session=>>", session);
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link legacyBehavior href="/">
          <a className={styles.logo}>
            <img src="../../../logo.png" alt="" />
          </a>
        </Link>
        {session?.user?.role === "admin" && (
          <div className={styles.nav}>
            <Link href="/admin/dashboard" legacyBehavior>
              <a className={styles.nav__item}>Admin</a>
            </Link>
          </div>
        )}
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search__icon}>
            <RiSearchLine />
          </div>
        </div>
        <Link href="/cart" className={styles.cart}>
          <FaOpencart />
          <span>0</span>
        </Link>
      </div>
    </div>
  );
}
