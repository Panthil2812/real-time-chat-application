import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { LOCALHOST_KEY } from "../apiServices/baseurl";
import axiosInstance from "../apiServices/axiosInstance";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const getMessages = async () => {
    const data = await JSON.parse(localStorage.getItem(LOCALHOST_KEY));
    const response = await axiosInstance.post(`message/get-messages`, {
      from: data?._id,
      to: currentChat?._id,
    });
    setMessages(response.data);
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(LOCALHOST_KEY));
    if (currentChat._id && data._id) {
      getMessages();
    }
  }, [currentChat]);
  const handleSendMsg = async (msg) => {
    const currentUser = JSON.parse(localStorage.getItem(LOCALHOST_KEY));

    socket.current.emit("send-msg", {
      to: currentChat?._id,
      from: currentUser?._id,
      msg,
    });

    await axiosInstance.post(`message/add-message`, {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid grid-rows-7 overflow-hidden bg-cyan-300 rounded-xl">
      <div className="flex justify-between items-center px-6 ">
        <div className="flex items-center gap-4">
          <div className="flex justify-center h-12 w-12  bg-cyan-800 text-white items-center font-bold rounded-full">
            {currentChat?.username.match(/\b\w/g).join("").toUpperCase()}
          </div>
          <div className="">
            <h3 className="font-bold text-lg text-cyan-800 capitalize">
              {currentChat?.username}
            </h3>
          </div>
        </div>
      </div>
      <div className=" row-span-6 bg-cyan-100 rounded-lg p-4 mx-2 overflow-auto scrollbar-hidden">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`flex ${
                  message.fromSelf ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.fromSelf ? "bg-cyan-500 " : "bg-cyan-400 "
                  }content max-w-80 overflow-wrap break-words p-2 px-4 mt-2 text-base rounded-xl`}
                >
                  <p className="text-base font-medium">{message?.message}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef}></div>
      </div>
      <div className="w-full">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}
