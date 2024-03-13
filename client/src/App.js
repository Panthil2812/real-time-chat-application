import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
      <ToastContainer
        limit={2}
        toastStyle={{
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: "10px",
        }}
        closeButton={false}
        hideProgressBar={true}
        style={{
          width: "auto",
          transition: "background-color 0.5s ease",
        }}
        autoClose={1500}
      />
    </BrowserRouter>
  );
}
