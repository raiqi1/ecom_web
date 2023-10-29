import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import ProductSwiper from "./ProductSwiper";

export default function ProductCard({ product }) {
  console.log("productDb==>",product.subProducts)
  console.log(`product ${product._id}`,product.subProducts);
  const [active, setActive] = React.useState(0);
  const [images, setImages] = React.useState(
    product.subProducts[active]?.images
  );
  const [prices, setPrices] = React.useState(
    product.subProducts[active]?.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );

  //   console.log(images);
  //   console.log(prices);
  const [styless, setStyless] = React.useState(
    product.subProducts.map((c) => {
      return c.color;
    })
  );
  // console.log(styless);
  useEffect(() => {
    setImages(product.subProducts[active].images);
    setPrices(
      product.subProducts[active].sizes
        .map((s) => {
          return s.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active]);
  console.log("imagesHome",images);
  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`product/${product.slug}?style=${active}`}>
          <div>
            <ProductSwiper images={images} />
          </div>
        </Link>
        {product.subProducts[active].discount ? (
          <div className={styles.product__discount}>
            {product.subProducts[active].discount}%
          </div>
        ) : (
          ""
        )}
        <div className={styles.product__infos}>
          <h1>
            {product.name.length > 45
              ? `${product.name.substring(0, 45)}...`
              : `${product.name}`}
          </h1>
          <span>
            {prices.length === 1
              ? `USD${prices[0]}$`
              : `USD${prices[0]}-${prices[prices.length - 1]}$`}
          </span>
          <div className={styles.product__colors}>
            {styless &&
              styless.map((style, i) =>
                style.image ? (
                  <img
                    src={style.image}
                    alt=""
                    className={i === active && style.active}
                    onMouseOver={() => {
                      setImages(product.subProducts[i].images);
                      setActive(i);
                    }}
                  />
                ) : (
                  <span
                    style={{ backgroundColor: `${style.color}` }}
                    onMouseOver={() => {
                      setImages(product.subProducts[i].images);
                      setActive(i);
                    }}
                  ></span>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
