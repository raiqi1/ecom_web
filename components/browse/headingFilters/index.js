import React from "react";
import styles from "./styles.module.scss";
import Tooltip from "@mui/material/Tooltip";
import { AiTwotoneStar } from "react-icons/ai";

export default function HeadingFilters() {
  return (
    <div className={styles.filters}>
      <div className={styles.filters__price}>
        <span>Price :</span>
        <input type="number" placeholder="min" min="0>" />
        <input type="number" placeholder="max" min="0>" />
      </div>
      <div className={styles.filters__priceBtns}>
        <Tooltip title="Price: Low to High" placement="top" arrow>
          <button>
            <span style={{ height: "100%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products beetween 10$</h2>}
          placement="top"
          arrow
        >
          <button>
            <span style={{ height: "100%",width:"100%" }}></span>
          </button>
        </Tooltip>
      </div>
      <div className={styles.filters__shipping}>
        <input type="checkbox" name="shipping" id="shipping" />
        <label htmlFor="shipping">Free Shipping</label>
      </div>
        <div className={styles.filters__rating}>
        <input type="checkbox" name="rating" id="rating" />
        <label htmlFor="rating">
            <AiTwotoneStar/>
            <AiTwotoneStar/>
            <AiTwotoneStar/>
            <AiTwotoneStar/> & up
        </label>
        </div>
        <div className={styles.filters__sort}>
            <span>Sort by</span>
            <div className={styles.filters__sort_list}>
                <button></button>
            </div>
        </div>
    </div>
  );
}
