import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";
import Image from "next/image";

export default function HeaderCart() {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link href="/">
            <Image src="/logo.png" width={100} height={100} alt="" />
          </Link>
        </div>
        <div className={styles.header__right}>
          <Link legacyBehavior href="/browse">
            <a>
              Continue Shopping
              <MdPlayArrow />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
