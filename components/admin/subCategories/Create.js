import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "../../input/inputs/adminInputs";
import { toast } from "react-toastify";
import axios from "axios";
import SingularSelect from "../../selects/SingularSelect";

export default function Create({ categories, setSubCategories }) {

  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  console.log("parent",parent)
  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Category Name max is 15 word")
      .min(3, "Category Name min 3 word")
      .matches(/^[a-zA-Z\s]*$/, "Numbers and Special karkter not allowed")
      .required("Sub-Category Name is Required"),
    parent: Yup.string().required("Parent Category is Required"),
  });

  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/admin/subCategory", {
        name,
        parent,
      });
      setSubCategories(data.subcategories);
      setName("");
      setParent("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{ name, parent }}
      enableReinitialize
      validationSchema={validate}
      onSubmit={() => {
        submitHandler();
      }}
    >
      {(formik) => (
        <Form>
          <div className={styles.header}>Create Category</div>
          <AdminInput
            type="text"
            label="name "
            name="name"
            placeholder="Sub-Category name"
            onChange={(e) => setName(e.target.value)}
          />
          <SingularSelect
            name="parent"
            data={categories}
            placeholder="Select Parent Category"
            value={parent}
            handleChange={(e) => setParent(e.target.value)}
          />
          <div className={styles.btnWrap}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btn__primary}`}
            >
              <span>Add Categories</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
