import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import axiosInstance from "../apiServices/axiosInstance";
import { toast } from "react-toastify";
import { LOCALHOST_KEY } from "../apiServices/baseurl";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem(LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const validateForm = () => {
    const { email, password } = formData;
    if (email === "") {
      toast.error("please enter email address.");

      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("please enter vaild email.");
      return false;
    } else if (password === "") {
      toast.error("please enter password.");
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      const response = await axiosInstance.post("user/user-sign-in", formData);

      if (response.status) {
        localStorage.setItem(LOCALHOST_KEY, JSON.stringify(response.data));
        localStorage.setItem("token", response.token);
        toast.success(response.message);
        navigate("/");
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
            <h1 className="text-3xl font-bold text-cyan-800">Login</h1>
          </div>
          <div className="mt-8">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="input"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input mt-4"
              value={formData.password}
              onChange={(e) => handleChange(e)}
            />

            <button
              className="btn mt-4 w-full"
              onClick={() => {
                handleSubmit();
              }}
            >
              Log In
            </button>
          </div>
          <p className="mt-4 text-center ">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan-800 font-bold">
              Register{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
