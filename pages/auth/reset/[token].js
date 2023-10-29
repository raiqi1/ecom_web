import React from "react";
import styles from "../../../styles/forgot.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import LoginInput from "../../../components/input/loginInput";
import DotLoaderSpinner from "../../../components/loaders/dotLoader";
import CircledIconBtn from "../../../components/buttons/circledIconBtn";
import jwt from "jsonwebtoken";
import { signIn, getSession } from "next-auth/react";

export default function reset({ user_id }) {
  console.log("user_id", user_id);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const resetValidation = Yup.object({
    password: Yup.string()
      .required("Enter your new password (such as ! and &).")
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    confirmPassword: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });
      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      setError("");
      window.location.reload(false);
    } catch (error) {
      setLoading(false);
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
              Reset your password <Link href="/">Go Store</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{ password, confirmPassword }}
            validationSchema={resetValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Enter your new password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="confirmPassword"
                  icon="password"
                  placeholder="Enter your confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <CircledIconBtn type="submit" text="Submit" />
              </Form>
            )}
          </Formik>
        </div>
        <div style={{ marginTop: "10px" }}>
          {error && <span className={styles.error}>{error}</span>}
        </div>
      </div>

      <Footer country="Indonesia" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const token = query.token;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);

  return {
    props: { user_id: user_id.id },
  };
}
