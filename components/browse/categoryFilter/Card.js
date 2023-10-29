import React, { useState } from "react";
import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";

export default function Card({ category, subCategories }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <section>
        <li>
          <input type="radio" name="filter" id={category._id} />
          <label htmlFor={category._id}>
            <a>{category.name}</a>
          </label>
          <span>{show ? <FaMminus /> : <BsPlusLg />}</span>
        </li>
      </section>
    </>
  );
}
