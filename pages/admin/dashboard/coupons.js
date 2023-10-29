import React, { useState } from "react";
import Layout from "../../../components/admin/layout";
import db from "../../utils/db";
import Coupon from "../../../models/Coupon";
import Create from "../../../components/admin/coupons/Create";
import List from "../../../components/admin/coupons/List";


export default function coupons({ coupons }) {
    
  const [data, setData] = useState(coupons);
  console.log("data", data);
  return (
    
      <Layout>
        <div>
          <Create setCoupons={setData} />
          <List coupons={data} setCoupons={setData} />
        </div>
      </Layout>

  );
}

export async function getServerSideProps(context) {
  db.connectDb();
    const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
    console.log("coupons", coupons);
    return {
        props: {
            coupons: JSON.parse(JSON.stringify(coupons)),
        },
    };
}
