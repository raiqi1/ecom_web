import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";
import Head from "next/head";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import LoginInput from "../../components/input/loginInput";
import { useState } from "react";
import CircledIconBtn from "../../components/buttons/circledIconBtn";
import axios from "axios";
import styles from "../../styles/profile.module.scss";


export default function index({ user, tab }) {
  console.log(user);
  const [current_password, setCurrent_password] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_Confirmation] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const validate = Yup.object({
    current_password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    password_confirmation: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const changePasswordHandler = async () => {
    try {
      const { data } = await axios.put("/api/user/changePassword", {
        current_password,
        password,
      });
      setError("");
      setSuccess(data.message);
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <Layout session={user.user} tab={tab}>
      <Head>
        <title>Profile Security</title>
      </Head>
      <Formik
        enableReinitialize
        initialValues={{ current_password, password, password_confirmation }}
        validationSchema={validate}
        onSubmit={() => changePasswordHandler()}
      >
        {(form) => (
          <Form>
            <LoginInput
              type="password"
              name="current_password"
              icon="password"
              placeholder="Current Password"
              onChange={(e) => setCurrent_password(e.target.value)}
            />
            <LoginInput
              type="password"
              name="password"
              icon="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginInput
              type="password"
              name="password_confirmation"
              icon="password"
              placeholder="Re-Type Your Password"
              onChange={(e) => setPassword_Confirmation(e.target.value)}
            />
            <CircledIconBtn type="submit" text="Update"/>
          </Form>
        )}
      </Formik>
      {success && <div className={styles.success}>{success}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  console.log(session);
  const tab = query.tab || 0;
  return {
    props: {
      user: session,
      tab,
    },
  };
}
