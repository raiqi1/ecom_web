import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "../components/home/main";
import FlashDeals from "../components/home/flashDeals";
import Category from "../components/home/category";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "../data/home";
import { useMediaQuery } from "react-responsive";
import ProductSwiper from "../components/productsSwiper";
import db from "./utils/db";
import Product from "../models/Product";
import ProductCard from "../components/productCard";

export default function Home({ country, products }) {
  console.log("products ==>", products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width: 850px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });

  console.log(session);
  return (
    <div>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes/ High Heels"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes/ High Heels"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductSwiper products={women_swiper} />
          
          <ProductSwiper
            products={gamingSwiper}
            header="For Gaming"
            bg="#2f82ff"
          />
          <ProductSwiper
            products={homeImprovSwiper}
            header="House tools"
            bg="#3c811f"
          />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>

        </div>
      </div>
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  let data = await axios
    .get("https://api.ipregistry.co/?key=lab88z72qswmnlnr")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: { name: data.name, flag: data.flag.emojitwo },
    },
  };
}
