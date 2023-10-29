import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "../../input/inputs/adminInputs";
import { toast } from "react-toastify";
import axios from "axios";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@material-ui/core";

export default function Create({ setCoupons }) {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow);

  console.log(startDate, endDate);

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };

  console.log("startDate", startDate);
  console.log("endDate", endDate);

  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Category Name max is 15 word")
      .min(3, "Category Name min 3 word")
      .matches(/^[a-zA-Z\s]*$/, "Numbers and Special karkter not allowed")
      .required("Category Name is Required"),
    discount: Yup.number()
      .max(99, "Discount max is 99%")
      .min(1, "Discount min is 1%")
      .required("Discount is Required"),
  });

  const submitHandler = async () => {
    try {
      if(startDate.toString() === endDate.toString()){
       toast.error("Start Date and End Date can not be same")
      }else if (endDate.getTime() - startDate.getTime() < 0){
        toast.error("End Date can not be less then Start Date")
      }
      const { data } = await axios.post("/api/admin/coupon", {
        coupon: name,
        discount,
        startDate,
        endDate,
      });
      setCoupons(data.coupons);
      setName("");
      setDiscount(0);
      setStartDate(new Date());
      setEndDate(tomorrow);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{ name, discount }}
      enableReinitialize
      validationSchema={validate}
      onSubmit={() => {
        submitHandler();
      }}
    >
      {(formik) => (
        <Form>
          <div className={styles.header}>Create Coupon</div>
          <AdminInput
            type="text"
            label="name"
            name="name"
            placeholder="Enter coupons name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <AdminInput
            type="number"
            label="Discount"
            name="discount"
            placeholder="Enter discount coupon "
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <div className={styles.date_picker}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/dd/yyyy"
                value={startDate}
                onChange={handleStartDate}
                renderInput={(params) => <TextField {...params} />}
                minDate={new Date()}
              />
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={endDate}
                onChange={handleEndDate}
                renderInput={(params) => <TextField {...params} />}
                minDate={tomorrow}
              />
            </LocalizationProvider>
          </div>
          <div className={styles.btnWrap}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btn__primary}`}
            >
              <span>Add Coupons</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
