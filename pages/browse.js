import React from "react";
import styles from "../styles/browse.module.scss";
import db from "./utils/db";
import Product from "../models/Product";
import Category from "../models/Category";
import SubCategory from "../models/SubCategory";
import { filterArray, randomize, removeDuplicates } from "./utils/arrays_utils";
import Header from "../components/header";
import Link from "next/link";
import ProductCard from "../components/productCard";
import CategoryFilter from "../components/browse/categoryFilter";
import SizesFilter from "../components/browse/sizesFilter";
import ColorFilter from "../components/browse/colorFilter";
import BrandFilter from "../components/browse/brandFilter";
import StyleFilter from "../components/browse/styleFilter";
import PatternFilter from "../components/browse/patternFilter";
import MaterialFilter from "../components/browse/materialFilter";
import GenderFilter from "../components/browse/genderFilter";
import HeadingFilters from "../components/browse/headingFilters";

export default function browse({
  categories,
  products,
  subCategories,
  sizes,
  colors,
  brands,
  style,
  pattern,
  materials,
}) {
  console.log("categories", categories);
  console.log("sizes", sizes);
  console.log("colors", colors);
  console.log("brands", brands);
  console.log("style", style);
  return (
    <div className={styles.browse}>
      <Header country="" />
      <div className={styles.browse__container}>
        <div className={styles.browse__path}>Home / Browse</div>
        <div className={styles.browse__tags}>
          {categories.map((c, i) => (
            <Link href="" key={i}>
              {c.name}
            </Link>
          ))}
        </div>
        <div className={styles.browse__store}>
          <div
            className={`${styles.browse__store_filters} ${styles.scrollbar}`}
          >
            <button className={styles.browse__clearBtn}>Clear All (3)</button>
            <CategoryFilter
              categories={categories}
              subCategories={subCategories}
            />
            <SizesFilter sizes={sizes} />
            <ColorFilter colors={colors} />
            <BrandFilter brands={brands} />
            <StyleFilter data={style} />
            <PatternFilter pattern={pattern} />
            <MaterialFilter materials={materials} />
            <GenderFilter />
          </div>
          <div className={styles.browse__store_products_wrap}>
            <HeadingFilters />
            <div className={styles.browse__store_products}>
              {products.map((p) => (
                <ProductCard product={p} key={p._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  db.connectDb();
  let productsDb = await Product.find().sort({ createdAt: -1 }).lean();
  let products = randomize(productsDb);
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find()
    .populate({ path: "parent", model: Category })
    .lean();
  let colors = await Product.find().distinct("subProducts.color.color");
  let brandsDb = await Product.find().distinct("brand");
  let sizes = await Product.find().distinct("subProducts.sizes.size");
  let details = await Product.find().distinct("details");
  let stylesDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDB = filterArray(details, "Material");
  let styles = removeDuplicates(stylesDb);
  let pattern = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDB);
  let brands = removeDuplicates(brandsDb);
  console.log("stylesDb", stylesDb);
  console.log("sizes", sizes);
  console.log("brandsDb", brandsDb);
  console.log("colors", colors);
  console.log("styles", styles);
  console.log("pattern", pattern);
  console.log("materials", materials);
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
      sizes,
      colors,
      brands,
      style: styles,
      pattern,
      materials,
    },
  };
}
