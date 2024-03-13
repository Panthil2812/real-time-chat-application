import React, { useState, useEffect } from "react";
import { LOCALHOST_KEY } from "../apiServices/baseurl";
import Logout from "./Logout";
export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(LOCALHOST_KEY));
    setCurrentUserName(data?.username);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <div className="grid grid-rows-7 overflow-hidden bg-cyan-300 rounded-xl">
          <div className="flex justify-center items-center px-6">
            <div className="flex items-center">
              <h3 className="uppercase text-lg font-bold">chat application</h3>
            </div>
          </div>

          <div className="row-span-6  bg-cyan-100 mx-2 rounded-t-lg border-x-4 border-t-4 border-cyan-900 overflow-auto scrollbar-hidden">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`flex items-center gap-4 p-2 mx-3 my-4 rounded-md cursor-pointer ${
                  index === currentSelected
                    ? "bg-cyan-900"
                    : "bg-cyan-700 hover:bg-cyan-800"
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="flex justify-center h-12 w-12 bg-cyan-200 items-center font-bold rounded-full">
                  {contact?.username.match(/\b\w/g).join("").toUpperCase()}
                </div>

                <h3 className="text-white font-semibold capitalize">
                  {contact?.username}
                </h3>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center p-4 bg-cyan-600">
            <div className="flex items-center gap-4">
              <div className="flex justify-center h-12 w-12 bg-cyan-200 items-center font-bold rounded-full">
                {currentUserName.match(/\b\w/g).join("").toUpperCase()}
              </div>
              <div className="username">
                <h2 className="text-white text-xl font-semibold">
                  {currentUserName}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Logout />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
