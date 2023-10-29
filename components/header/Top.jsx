import React from "react";
import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

export default function Top({ country }) {
  const { data: session } = useSession();
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img src={country.flag} alt="" />
            <span>{country.name}</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>customer service</span>
          </li>
          <li className={styles.li}>
            <span>help</span>
          </li>
          <li className={styles.li}>
            <BsHeart />
            <Link href="/profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img src={session?.user?.image} alt="" />
                  <span>{session.user.name}</span>
                  <RiArrowDropDownLine />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownLine />
                </div>
              </li>
            )}
            {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
