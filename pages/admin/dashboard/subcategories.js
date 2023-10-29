import React, { useState } from "react";
import Layout from "../../../components/admin/layout";
import db from "../../utils/db";
import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";
import Create from "../../../components/admin/subCategories/Create";
import List from "../../../components/admin/subCategories/List";


export default function subcategories({ categories, SubCategories }) {
  const [data, setData] = useState(SubCategories);
  console.log("data1", data);
  console.log("setData", setData);
  return (
    <Layout>
      <div>
        <Create setSubCategories={setData} categories={categories} />
        <List
          SubCategories={data}
          setSubCategories={setData}
          categories={categories}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  const SubCategories = await SubCategory.find({})
    .populate({ path: "parent", model: Category })
    .sort({ updatedAt: -1 })
    .lean();
  console.log("categories", categories);
  console.log("SubCategories", SubCategories);
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      SubCategories: JSON.parse(JSON.stringify(SubCategories)),
    },
  };
}
