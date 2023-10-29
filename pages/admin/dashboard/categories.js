import React, { useState } from "react";
import Layout from "../../../components/admin/layout";
import db from "../../utils/db";
import Category from "../../../models/Category";
import Create from "../../../components/admin/caegories/Create";
import List from "../../../components/admin/caegories/List";

export default function categories({ categories }) {
  const [data, setData] = useState(categories);
  console.log("data", data);
  return (
    <div>
      <Layout>
        <div>
          <Create setCategories={setData} />
          <List categories={data} setCategories={setData} />
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  console.log("categories", categories);
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
