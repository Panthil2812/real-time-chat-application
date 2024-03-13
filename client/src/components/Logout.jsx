import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center p-2 rounded-md bg-cyan-800 hover:bg-cyan-900 focus:outline-none"
    >
      <BiPowerOff className="text-white text-lg" />
    </button>
  );
}
