import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import axiosInstance from "../apiServices/axiosInstance";
import { BACKEND_BASE_URL, LOCALHOST_KEY } from "../apiServices/baseurl";
import { toast } from "react-toastify";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = () => {
    try {
      const storedUser = localStorage.getItem(LOCALHOST_KEY);
      if (!storedUser) {
        navigate("/login");
      } else {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(BACKEND_BASE_URL);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  const fetchallUser = async () => {
    try {
      const response = await axiosInstance.get("user/get-all-user");
      if (response.status) {
        setContacts(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      fetchallUser();
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-800 p-2">
        <div className="container  gap-4 bg-gray-900 rounded-lg p-6">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat && currentChat._id ? (
            <ChatContainer currentChat={currentChat} socket={socket} />
          ) : (
            <Welcome />
          )}
        </div>
      </div>
    </>
  );
}
