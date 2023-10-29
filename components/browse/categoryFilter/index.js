import React, { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import Card from "./Card";

export default function CategoryFilter({ categories, subCategories }) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.filter}>
      <h3>
        Category{" "}
        <span>
          {show ? (
            <FaMinus onClick={() => setShow(!show)} />
          ) : (
            <BsPlusLg onClick={() => setShow(!show)} />
          )}
        </span>
      </h3>
      {show &&
        categories.map((category, i) => (
          <Card key={i} category={category} subCategories={subCategories} />
        ))}
    </div>
  );
}
