import React from "react";
import styles from "../../../../styles/products.module.scss";
import Layout from "../../../../components/admin/layout";
import db from "../../../utils/db";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import ProductCard from "../../../../components/admin/products/ProductCard";

export default function all({ products }) {
  console.log("products", products);
  return (
    <Layout>
      <div className={styles.header}>All Products</div>
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  db.connectDb();
  const products = await Product.find({})
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
