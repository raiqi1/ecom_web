import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";
import Order from "../../models/Order";
import Head from "next/head";
import styles from "../../styles/profile.module.scss";
import { ordersLinks } from "../../data/profile";
import Link from "next/link";
import { BsEyeFill } from "react-icons/bs";
import slugify from "slugify";
import { useRouter } from "next/router";

export default function index({ user, tab, orders }) {
  console.log("orders=>", orders);
  const router = useRouter()
  return (
    <Layout session={user.user} tab={tab}>
      <Head>
        <title>Orders</title>
      </Head>
      <div className={styles.orders}>
        <div className={styles.header}>MY ORDERS</div>
        <nav>
          <ul>
            {ordersLinks.map((link, i) => (
              <li
                key={i}
                className={
                  slugify(link.name, { lower: true }) ==
                  router.query.q.split("__")[0]
                    ? styles.active
                    : ""
                }
              >
                <Link
                  href={`/profile/orders?tab=${tab}&q=${slugify(link.name, {
                    lower: true,
                  })}__${link.filter}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <table>
          <thead>
            <tr>
              <td>Order id</td>
              <td>Product</td>
              <td>Style</td>
              <td>Payment Method</td>
              <td>Total</td>
              <td>Paid</td>
              <td>Status</td>
              <td>View</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order._id}</td>
                <td>
                  {order.products.map((product, i) => (
                    <img
                      src={product.image}
                      alt=""
                      key={i}
                      className={styles.image}
                    />
                  ))}
                </td>
                <td>
                  {order.products.map((product, i) => (
                    <img
                      src={product.color.image}
                      alt=""
                      key={i}
                      className={styles.image}
                    />
                  ))}
                </td>
                <td>
                  {order.paymentMethod === "paypal"
                    ? "Paypal"
                    : "cash"
                    ? "Cash"
                    : "credit_card"
                    ? "Credit Card"
                    : ""}
                </td>
                <td>{order.total}$</td>
                <td>
                  {order.isPaid ? (
                    <img
                      src="../../../images/verified.png"
                      className={styles.img1}
                    />
                  ) : (
                    <img
                      src="../../../images/unverified1.png"
                      className={styles.img1}
                    />
                  )}
                </td>
                <td
                  className={
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
                  }
                >
                  {order.status}
                </td>
                <td>
                  <Link href={`/order/${order._id}`}>
                    <BsEyeFill />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  console.log(session);
  const tab = query.tab || 0;
  const filter = query.q.split("__")[1];
  let orders = [];
  if (!filter) {
    orders = await Order.find({ user: session?.user?.id })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter === "paid") {
    orders = await Order.find({ user: session?.user?.id, isPaid: true })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter === "unpaid") {
    orders = await Order.find({ user: session?.user?.id, isPaid: false })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else {
    orders = await Order.find({ user: session?.user?.id, status: filter })
      .sort({
        createdAt: -1,
      })
      .lean();
  }
  return {
    props: {
      user: session,
      tab,
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
