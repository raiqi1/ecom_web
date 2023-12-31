import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "yup-phone";
import ShippingInput from "../../../input/shippinginput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { countries } from "../../../../data/countries";
import SingularSelect from "../../../selects/SingularSelect";
import {
  saveAddress,
  changeActiveAddress,
  deleteAddress,
} from "../../../../request/user";
import { FaIdCard, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { CgRemove } from "react-icons/cg";
import { useRouter } from "next/router";
import DotLoaderSpinner from "../../../loaders/dotLoader";
import { useDispatch } from "react-redux";
import DialogModal from "../../../dialogModal";
import { showDialog } from "../../../../store/DialogSlice";

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
};

export default function Shipping({
  user,
  addresses,
  setAddresses,
  selectedAddress,
  setSelectedAddress,
  profile,
}) {
  const Router = useRouter();
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(
    user?.address.length ? false : true
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country,
  } = shipping;
  const validate = Yup.object({
    firstName: Yup.string()
      .required("First name is required.")
      .min(3, "First name must be atleast 3 characters long.")
      .max(20, "First name must be less than 20 characters long."),
    lastName: Yup.string()
      .required("Last name is required.")
      .min(3, "Last name must be atleast 3 characters long.")
      .max(20, "Last name must be less than 20 characters long."),
    phoneNumber: Yup.string()
      .required("Phone number is required.")
      .phone()
      .min(3, "Phone number must be atleast 3 characters long.")
      .max(30, "Phone number must be less than 20 characters long."),
    state: Yup.string()
      .required("State name is required.")
      .min(2, "State name should contain 2-60 characters..")
      .max(60, "State name should contain 2-60 characters."),
    city: Yup.string()
      .required("City name is required.")
      .min(2, "City name should contain 2-60 characters.")
      .max(60, "City name should contain 2-60 characters."),
    zipCode: Yup.string()
      .required("ZipCode/Postal is required.")
      .min(2, "ZipCode/Postal should contain 2-30 characters..")
      .max(30, "ZipCode/Postal should contain 2-30 characters."),
    address1: Yup.string()
      .required("Address Line 1 is required.")
      .min(5, "Address Line 1 should contain 5-100 characters.")
      .max(100, "Address Line 1 should contain 5-100 characters."),
    address2: Yup.string()
      .min(5, "Address Line 2 should contain 5-100 characters.")
      .max(100, "Address Line 2 should contain 5-100 characters."),
    country: Yup.string().required("Country name is required."),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping);
    // setLoading(true)
    // setTimeout(()=> {
    //   setLoading(false)
    // }, 1000)
    dispatch(
      showDialog({
        header: "Address Added Successfully",
        msgs: [
          {
            msg: "Success",
            type: "success",
          },
        ],
      })
    );
    setAddresses([...addresses, res]);
    setSelectedAddress(res);

    console.log("setSelectedAddress", setAddresses);
    // window.location.re();
  };

  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);
    setAddresses(res.addresses);
    console.log("select Address", res);
  };
  const deleteAddressHandler = async (id) => {
    const res = await deleteAddress(id);
    setAddresses(res.addresses);
  };

  return (
    <>
      {loading ? (
        <DotLoaderSpinner />
      ) : (
        <div className={styles.shipping}>
          <DialogModal />
          {!profile && (
            <div className={styles.header}>
              <h2>Shipping Information</h2>
            </div>
          )}
          <div className={styles.addresses}>
            {addresses?.map((address, i) => (
              <div style={{ position: "relative" }} key={i}>
                <div
                  className={styles.address__delete}
                  onClick={() => deleteAddressHandler(address._id)}
                >
                  <CgRemove />
                </div>
                <div
                  className={`${styles.address} ${
                    address.active && styles.active
                  }`}
                  key={address._id}
                  onClick={() => changeActiveHandler(address._id)}
                >
                  <div className={styles.address__side}>
                    <img src={profile ? user.user.image : user.image} alt="" />
                  </div>
                  <div className={styles.address__col}>
                    <span>
                      <FaIdCard />
                      {address.firstName} {address.lastName}
                    </span>
                    <span>
                      <FaPhoneAlt />
                      {address.phoneNumber}
                    </span>
                  </div>
                  <div className={styles.address__col}>
                    <span>
                      <FaMapMarkerAlt />
                      {address.address1}
                    </span>
                    <span>{address.address2}</span>
                    <span>
                      {address.city},{address.state},{address.country}
                    </span>
                    <span>{address.zipCode}</span>
                  </div>
                  <span
                    className={styles.active__text}
                    style={{
                      display: `${!address.active && "none"}`,
                    }}
                  >
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            className={styles.hide_show}
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <span>
                <IoMdArrowDropdownCircle
                  style={{ fontSize: "2rem", fill: "#222" }}
                />
              </span>
            ) : (
              <span>
                ADD NEW ADDRESS <AiOutlinePlus />
              </span>
            )}
          </button>
          {visible && (
            <Formik
              enableReinitialize
              initialValues={{
                firstName,
                lastName,
                phoneNumber,
                state,
                city,
                zipCode,
                address1,
                address2,
                country,
              }}
              validationSchema={validate}
              onSubmit={() => {
                saveShippingHandler();
              }}
            >
              {(formik) => (
                <Form>
                  <SingularSelect
                    name="country"
                    value={country}
                    placeholder="*Country"
                    handleChange={handleChange}
                    data={countries}
                  />
                  <div className={styles.col}>
                    <ShippingInput
                      name="firstName"
                      placeholder="*First Name"
                      onChange={handleChange}
                    />
                    <ShippingInput
                      name="lastName"
                      placeholder="*Last Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.col}>
                    <ShippingInput
                      name="state"
                      placeholder="*State/Province"
                      onChange={handleChange}
                    />
                    <ShippingInput
                      name="city"
                      placeholder="*City"
                      onChange={handleChange}
                    />
                  </div>
                  <ShippingInput
                    name="phoneNumber"
                    placeholder="*Phone number"
                    onChange={handleChange}
                  />
                  <ShippingInput
                    name="zipCode"
                    placeholder="*Post/Zip code"
                    onChange={handleChange}
                  />
                  <ShippingInput
                    name="address1"
                    placeholder="Address 1"
                    onChange={handleChange}
                  />
                  <ShippingInput
                    name="address2"
                    placeholder="Address 2"
                    onChange={handleChange}
                  />
                  <button type="submit">Save Address</button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      )}
    </>
  );
}
