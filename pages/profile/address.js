import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";
import User from "../../models/User";
import Shipping from "../../components/cart/checkout/shipping";
import styles from "../../styles/profile.module.scss";
import { useState } from "react";

export default function index({ user, tab }) {
  const [addressess, setAddresses] = useState(user.address.address || []);
  const [selectedAddress, setSelectedAddress] = useState("");

  console.log("user", user);
  console.log("addressess", addressess);

  return (
    <Layout session={user.user} tab={tab}>
      <div className={styles.header}>Addresses</div>
      <Shipping
        user={user}
        addresses={addressess}
        setAddresses={setAddresses}
        profile
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  console.log(session);
  const tab = query.tab || 0;
  const address = await User.findById(session.user.id).select("address").lean();
  return {
    props: {
      user: {
        user: session.user,
        address: JSON.parse(JSON.stringify(address)),
      },
      tab,
    },
  };
}
