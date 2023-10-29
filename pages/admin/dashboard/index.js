import React from "react";
import styles from "../../../styles/dashboard.module.scss";
import Layout from "../../../components/admin/layout";
import User from "../../../models/User";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Dropdown from "../../../components/admin/dashboard/dropdown/Dropdown";
import Notifications from "../../../components/admin/dashboard/notifications";
import { TbUsers } from "react-icons/tb";
import { SiProducthunt } from "react-icons/si";
import { SlHandbag, SlEye } from "react-icons/sl";
import { GiTakeMyMoney } from "react-icons/gi";
import Link from "next/link";

export default function dashboard({ users, orders, products }) {
  console.log("users==>", users);
  console.log("orders==>", orders);
  console.log("products==>", products);

  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>ToKpEd - Admin Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Search here..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.image} />
            <Notifications />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
            <div className={styles.card__infos}>
              <h4>+{users.length}</h4>
              <span>Users</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
            <div className={styles.card__infos}>
              <h4>+{orders.length}</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__infos}>
              <h4>+{products.length}</h4>
              <span>Products</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card__infos}>
              <h4>
                +{orders.reduce((a, val) => a + val.total, 0).toFixed(2)}$
              </h4>
              <h5>
                -
                {orders
                  .filter((o) => !o.isPaid)
                  .reduce((a, val) => a + val.total, 0)
                  .toFixed(2)}
                $
              </h5>
              <span>Total Earnings</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Recent Orders</h2>
              <Link href="/admin/dashboard/orders">View All</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Total</td>
                  <td>Payment</td>
                  <td>Status</td>
                  <td>View</td>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0,5).map((order, i) => (
                  <tr key={i}>
                    <td>{order.user.name}</td>
                    <td>{order.total}</td>
                    <td>
                      {order.isPaid ? (
                        <img src="../../../images/verified.png" />
                      ) : (
                        <img src="../../../images/unverified1.png" />
                      )}
                    </td>
                    <td>
                      <div
                        className={`${styles.status} ${
                          order.status === "Not Processing"
                            ? styles.not_processed
                            : order.status === "Processing"
                            ? styles.processing
                            : order.status === "Dispatched"
                            ? styles.dispatched
                            : order.status === "Cancelled"
                            ? styles.cancelled
                            : order.status === "Completed"
                            ? styles.completed
                            : ""
                        }`}
                      >
                        {order.status}
                      </div>
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <SlEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>Recent Orders</h2>
              <Link href="/admin/dashboard/users">View All</Link>
            </div>
            <table>
              <tbody>
                {users.slice(0,5).map((user, i) => (
                  <tr key={i}>
                    <td className={styles.user}>
                      <div className={styles.user__img}>
                        <img src={user.image} alt="" />
                      </div>
                      <td>
                        <h4>{user.name}</h4>
                        <span>{user.email}</span>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const users = await User.find().lean();
  const orders = await Order.find()
    .populate({ path: "user", model: User })
    .lean();
  const products = await Product.find().lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
