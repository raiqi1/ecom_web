/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.scss";
import { useSession,signIn } from "next-auth/react";
import Link from "next/link";

export default function Empty() {
  const { data: session } = useSession();
  return (
    <div className={styles.empty}>
      <img src="../../../images/empty.png" alt="" />
      <h1>Cart is Empty</h1>
      {session ? (
        <Link href="/browse" legacyBehavior>
          <a>
            <button className={styles.button}>Shop Now</button>
          </a>
        </Link>
      ) : (
          <button  onClick={() => signIn()}>Login</button>
      )}
    </div>
  );
}
