import React from "react";
import { useState } from "react";
import ImgLogin from "../assets/img/imgLogin.jpg";
import { FaEye, FaRectangleXmark } from "react-icons/fa6";
import PopUp from "../component/PopUp";
import Logo from "../component/Logo";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/reducers/auth";

function Login() {
  const [pass, setPassword] = React.useState("password");
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  function changePassword() {
    if (pass === "password") {
      setPassword("text");
    } else {
      setPassword("password");
    }
  }
  const formik = useFormik({
    onSubmit: signIn,
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email format")
        .matches(
          /@(gmail|mail)\.com$/,
          "Email must contain '@', 'gmail', 'mail', '.com'"
        )
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
  });

  async function signIn() {
    const email = formik.values.email;
    const password = formik.values.password;

    console.log(email);
    console.log(password);

    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);
    const dataLogin = await fetch("http://103.93.58.89:21219/auth/login", {
      method: "POST",
      body: formData,
    });
    const json = await dataLogin.json();
    dispatch(login(json.results));
    console.log(json);
    if (json.success) {
      navigate("/dataJamaah");
    } else {
      setLoading(false);
      setMessage(json.message);
      setAlert(true);
    }
  }
  return (
    <div className="flex w-full h-[100vh]  bg-[#006BFF]">
      <div className="w-full h-screen md:flex ">
        <img
          src={ImgLogin}
          alt="img-login"
          className="h-full object-cover brightness-50 md:brightness-90"
        />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full absolute md:relative p-10  md:flex"
      >
        <div className="flex flex-col text-[#FFF100] gap-10 items-center md:items-start justify-center">
          <Logo />
          <h1 className="font-semibold text-[60px]">Sign In</h1>
          <p className="text-[20px] text-[#BCF2F6]">
            Fill out the form correctly
          </p>
          <div className="w-full flex flex-col text-[20px] gap-5">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              className="drop-shadow-2xl p-4 rounded-xl text-black"
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="font-bold text-red-300">{formik.errors.email}</p>
            )}
            <label htmlFor="">Password</label>
            <div className="flex text-black drop-shadow-2xl bg-white p-4 rounded-xl">
              <input
                type={pass}
                name="password"
                id="password"
                placeholder="Enter Your Password"
                className="w-full outline-none"
                onChange={formik.handleChange}
              />
              <button type="button" onClick={changePassword}>
                <FaEye className="text-[30px]" />
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="font-bold text-red-300">{formik.errors.password}</p>
            )}
          </div>

          <button className="bg-yellow-300 drop-shadow-2xl text-white text-[20px] p-5 rounded-2xl w-full">
            Sign In
          </button>
        </div>
      </form>
      {alert ? (
        <div className="absolute flex bg-black/50 w-full h-screen top-0 left-0 items-center justify-center">
          <div className="bg-[#27005D] text-[#AED2FF] w-[375px] flex flex-col items-center gap-[20px] rounded-md p-[10px]">
            <div>{message}</div>
            <button
              className="flex gap-[10px] items-center justify-center"
              onClick={() => setAlert()}
            >
              <FaRectangleXmark />
              <p>Cancel</p>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {loading ? <PopUp /> : ""}
    </div>
  );
}
export default Login;
