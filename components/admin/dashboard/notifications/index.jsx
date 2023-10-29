import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { IoNotificationsSharp } from "react-icons/io5";
import { notificationsData } from "../../../../data/notifications";
//-----------------------
export default function Notifications() {
  const [show, setShow] = useState(false);
  return (
    <div
      className={styles.dropdown}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={styles.dropdown__svg}>
        <IoNotificationsSharp />
      </div>
      <div
        className={`${styles.dropdown__content} ${styles.scrollbar} ${show ? styles.active : ""}`}
      >
        <div className={styles.dropdown__content_notifications}>
          {notificationsData.map((n, i) => (
            <>
              {n.type === "order" ? (
                <div
                  className={
                    styles.dropdown__content_notifications_notification
                  }
                  key={i}
                >
                  <img src={n.image} alt="" />
                  <p>
                    {n.user}{" "}
                    <span>
                      has Created New Order <br /> total of :{" "}
                    </span>
                    {n.total}$
                  </p>
                </div>
              ) : (
                <div
                  className={
                    styles.dropdown__content_notifications_notification
                  }
                  key={i}
                >
                  <img src={n.image} alt="" />
                  {n.user} <span>New Account Created</span>
                </div>
              )}
            </>
          ))}
        </div>
        <div className={styles.dropdown__footer}>
          <Link href="/admin/dashboard/notifications">
            See all Notifications
          </Link>
        </div>
      </div>
    </div>
  );
}
