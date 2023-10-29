import React from "react";
import styles from "./styles.module.scss";
import ListItem from "./ListItem";

export default function List({ categories,SubCategories, setSubCategories }) {
  return (
    <ul className={styles.list}>
      {SubCategories.map((sub) => (
        <ListItem
          key={sub._id}
          SubCategory={sub}
          categories={categories}
          setSubCategories={setSubCategories}
        />
      ))}
    </ul>
  );
}
