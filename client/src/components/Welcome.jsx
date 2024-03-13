import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";
import { LOCALHOST_KEY } from "../apiServices/baseurl";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  const fetchData = () => {
    const userData = JSON.parse(localStorage.getItem(LOCALHOST_KEY));
    setUserName(userData?.username);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="w-full flex justify-center align-middle items-center flex-col bg-white text-cyan-900 rounded-lg
    "
    >
      <img src={Robot} alt="robot" className="h-80" />
      <h1 className="text-3xl font-bold mt-8">
        Welcome,{" "}
        <span className="text-cyan-600">{userName ? userName : "null"}!</span>
      </h1>
      <h3 className="mt-4">Please select a chat to start messaging.</h3>
    </div>
  );
}
