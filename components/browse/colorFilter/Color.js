import React, { useState } from "react";
import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";

export default function Color({ color}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <section>
        <li>
          <input type="radio" name="filter"  />
          <label htmlFor={color}>
          <img src={color} alt="" />
          </label>
          <span>{show ? <FaMminus /> : <BsPlusLg />}</span>
        </li>
      </section>
    </>
  );
}
