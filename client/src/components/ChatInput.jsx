import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="items-center bg-cyan-800 p-4">
      <form
        onSubmit={(event) => sendChat(event)}
        className="col-span-2 flex gap-4"
      >
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="flex-1 p-3 rounded-md bg-cyan-700 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="w-24 flex justify-center items-center p-3 rounded-md bg-cyan-600 hover:bg-cyan-700 focus:outline-none"
        >
          <IoMdSend className="text-white" size={24} />
        </button>
      </form>
    </div>
  );
}
