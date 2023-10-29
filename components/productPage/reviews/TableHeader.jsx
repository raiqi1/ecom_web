import React from "react";
import styles from "./styles.module.scss";
import TableSelect from "./TableSelect";

export default function TableHeader({ allSizes, colors }) {
  const [rating, setRating] = React.useState("");
  const [size, setSize] = React.useState("");
  const [style, setStyle] = React.useState("");
  const [order, setOrder] = React.useState("");

  return (
    <div className={styles.table__header}>
      <TableSelect
        property={rating}
        text="Rating"
        data={ratings.filter((item) => item.value !== rating)}
        handleChange={setRating}
      />
      <TableSelect
        property={size}
        text="Size"
        data={allSizes.filter((item) => item.value !== size)}
        handleChange={setSize}
      />
      <TableSelect
        property={style}
        text="Style"
        data={colors.filter((item) => item.value !== style)}
        handleChange={setStyle}
      />
      <TableSelect
        property={order}
        text="Order"
        data={orderOptions.filter((item) => item.value !== order)}
        handleChange={setOrder}
      />
    </div>
  );
}

const ratings = [
  {
    text: "All",
    value: "",
  },
  {
    text: "5 star",
    value: 5,
  },
  {
    text: "4 star",
    value: 4,
  },
  {
    text: "3 star",
    value: 3,
  },
  {
    text: "2 star",
    value: 2,
  },
  {
    text: "1 star",
    value: 1,
  },
];

const orderOptions = [
  {
    text: "Recommended",
    value: "Recommended",
  },
  {
    text: "Most recent to oldest",
    value: "Most recent to oldest",
  },
  {
    text: "Oldest to most recent",
    value: "Oldest to most recent",
  },
];
