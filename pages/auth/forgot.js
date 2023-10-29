import React from "react";
import styles from "../../styles/forgot.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import CircledIconBtn from "../../components/buttons/circledIconBtn";
import * as Yup from "yup";
import LoginInput from "../../components/input/loginInput";
import axios from "axios";
import DotLoaderSpinner from "../../components/loaders/dotLoader";

export default function forgot() {
  const [email, setEmail] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const emailValidation = Yup.object({
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you want to reset your password."
      )
      .email("Enter a valid email address."),
  });

  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", { email });
      setError("");
      setSuccess(data.message);
      setEmail("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="Indonesia" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{ email }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CircledIconBtn type="submit" text="Send Email" />
              </Form>
            )}
          </Formik>
        </div>
        <div style={{ marginTop: "10px"}}>
        {error && <span className={styles.error}>{error}</span>}
        {success && <span className={styles.success}>{success}</span>}
      </div>
      </div>
      
      <Footer country="Indonesia" />
    </>
  );
}
