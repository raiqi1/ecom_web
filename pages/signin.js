/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";
import DotLoaderSpinner from "../components/loaders/dotLoader";
import CircledIconBtn from "../components/buttons/circledIconBtn";

import Router from "next/router";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  success: "",
  error: "",
  login_error: "",
};

export default function signin({ providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    password_confirmation,
    success,
    error,
    login_error,
  } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log(user);

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    login_password: Yup.string().required("Password is required"),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 and 16 characters")
      .max(16, "Name must be at most 16 characters")
      .matches(/^[a-zA-Z]+$/, "Name must be only letters"),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &)."
      )
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    password_confirmation: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, error: "", success: "" });
    setLoading(false);
    Router.push("/");
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, success: "", login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="indonesia" />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Wed be happy to join us! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best E-shopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{ login_email, login_password }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <input
                    type="text"
                    name="login_email"
                    placeholder="Email Address"
                    value={login_email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="login_password"
                    placeholder="Your Password"
                    value={login_password}
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign in" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot Password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or Continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name === "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        onClick={() => signIn(provider.id)}
                        className={styles.social__btn}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__header}></div>
          <div className={styles.login__form}>
            <h1>Sign Up</h1>
            <p>
              Get access to one of the best E-shopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{ name, email, password, password_confirmation }}
              validationSchema={registerValidation}
              onSubmit={() => signUpHandler()}
            >
              {(form) => (
                <Form>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    value={name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Re-Type Your Password"
                    value={password_confirmation}
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign Up" />
                </Form>
              )}
            </Formik>
            {success && <div className={styles.success}>{success}</div>}
            {error && <div className={styles.error}>{error}</div>}
          </div>
        </div>
      </div>
      <Footer country="Indonesia" />
    </>
  );
}
export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const callbackUrl = query.callbackUrl;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: { providers, csrfToken, callbackUrl },
  };
}