import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import axiosInstance from "../apiServices/axiosInstance";
import { toast } from "react-toastify";
import { LOCALHOST_KEY } from "../apiServices/baseurl";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem(LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("please enter vaild email.");
      return false;
    }

    return true;
  };
  const handleSubmit = async () => {
    if (handleValidation()) {
      const { email, username, password } = values;
      const response = await axiosInstance.post("user/add-new-user", {
        email,
        username,
        password,
      });

      if (response.status) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-cyan-800">
        <div className="max-w-md w-full p-8 bg-white rounded-lg border-4 border-white shadow-2xl">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-3xl font-bold text-cyan-800">Sign Up</h1>
          </div>
          <div className="mt-8">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="input"
              value={values?.username}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input mt-8"
              value={values?.email}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input mt-8"
              value={values?.password}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="input mt-8"
              value={values?.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
            <button
              className="btn mt-8 w-full "
              onClick={() => {
                handleSubmit();
              }}
            >
              Sign Up
            </button>
          </div>
          <p className="mt-4 text-center ">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-800 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
