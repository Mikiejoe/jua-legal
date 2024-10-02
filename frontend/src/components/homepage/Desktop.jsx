import React, { useEffect, useState } from "react";
import {
  MdAddComment,
  MdChat,
  MdLogout,
  MdPerson,
  MdSearch,
  MdSend,
  MdSettings,
} from "react-icons/md";

import ChatScreen from "./ChatScreen";

const chats = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function Desktop() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pk, setPk] = useState(null);
  const [chats, setChats] = useState([]);
  const [count, setCount] = useState(0);

  const fetchUserData = async () => {
    const produrl = "https://fololimo-api.onrender.com/api/v1/users/login/";
    const devurl = "http://127.0.0.1:8000/api/v1/users/user/";
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(devurl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (res) {
        const data = await res.json();
        console.log(data);
        setUsername(data.username);
        setEmail(data.email);
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const humanFriendlyDate = date.toLocaleString("en-US", {
      // weekday: 'long', // "Monday"
      year: "numeric", // "2024"
      month: "long", // "June"
      day: "numeric", // "3"
      hour: "numeric", // "9"
      minute: "numeric", // "13"
      second: "numeric", // "36"
      hour12: true, // "AM/PM"
    });
    return humanFriendlyDate;
  };

  const getChats = async () => {
    const token = localStorage.getItem("token");
    const devurl = "http://127.0.0.1:8000/api/v1/chats/";
    try {
      const res = await fetch(devurl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (res) {
        const data = await res.json();
        console.log(data);
        setChats(data);
      } else {
        console.log("Error getting chats!!");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const [activeTab, setActiveTab] = useState("message");
  const changeTab = (tab) => {
    setActiveTab(tab);
    console.log(activeTab);
  };

  const createChat = async () => {
    const token = localStorage.getItem("token");
    const devurl = "http://127.0.0.1:8000/api/v1/chats/";

    console.log(token);
    try {
      const res = await fetch(devurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setCount((prev) => prev++);
        console.log(count);
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUserData();
    getChats();
    console.log(count);
  }, [count]);
  return (
    <div className="flex bg-slate-300">
      {/* sidebar */}
      <div className="bg-slate-400 h-screen flex flex-col justify-between p-3">
        <div className="mt-16">
          <div
            onClick={createChat}
            className={`hover:bg-slate-400 hover:animate-pulse  flex items-center justify-center h-12 p-2 w-12 rounded-full ${
              activeTab === "message" ? " text-gray-900" : " text-gray-600"
            }`}
          >
            <MdAddComment size={28} />
          </div>
          <div
            onClick={() => changeTab("message")}
            className={`hover:bg-slate-400 hover:animate-pulse  flex items-center justify-center h-12 p-2 w-12 rounded-full ${
              activeTab === "message" ? " text-gray-900" : " text-gray-600"
            }`}
          >
            <MdChat size={28} />
          </div>

          <div
            onClick={() => changeTab("search")}
            className={`hover:bg-slate-400 hover:animate-pulse flex items-center justify-center h-12 p-2 w-12 rounded-full ${
              activeTab === "search" ? " text-gray-900" : " text-gray-600"
            }`}
          >
            <MdSearch size={28} />
          </div>
          <div
            onClick={() => changeTab("setting")}
            className={`hover:bg-slate-400 hover:animate-pulse flex items-center justify-center h-12 p-2 w-12 rounded-full ${
              activeTab === "setting" ? " text-gray-900" : " text-gray-600"
            }`}
          >
            <MdSettings size={28} />
          </div>
          <div
            onClick={() => changeTab("account")}
            className={`hover:bg-slate-400 hover:animate-pulse flex items-center justify-center h-12 p-2 w-12 rounded-full ${
              activeTab === "account" ? " text-gray-900" : " text-gray-600"
            }`}
          >
            <MdPerson size={28} />
          </div>
        </div>
        <div>
          <div
            aria-label="logout"
            className="hover:bg-slate-300 hover:animate-pulse flex text-gray-800 items-center justify-center h-12 p-2 w-12 rounded-full"
          >
            <MdLogout size={28} />
          </div>
        </div>
      </div>
      {/* sidebar */}
      {/* main */}
      <div className="w-full h-screen">
        {/* NavBar */}
        <div className="flex shadow-md shadow-slate-400 justify-between bg-slate-400 py-3 pr-3 items-center">
          <div className="flex border-[0.7px] border-gray-200 w-1/3 rounded-3xl h-8 overflow-clip  px-2 items-center">
            <MdSearch size={28} className="text-gray-200" />
            <input
              type="text"
              className="w-full bg-transparent py-4 px-1 outline-none placeholder:text-gray-200"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="text-end">
              <h1 className="font-semibold mr-2">{username}</h1>
              <p className="text-gray-500">{email}</p>
            </div>
            <div className="bg-slate-300 h-10 w-10 text-slate-400 border-[2px] border-white flex items-center justify-center rounded-full">
              <MdPerson size={48} />
            </div>
          </div>
        </div>

        {/* NavBar */}

        <div className="grid grid-cols-3">
          <div className="px-2 col-span-1 pt-2 overflow-y-scroll h-[90vh]">
            {chats.map((i, n) => (
              <div
                key={n}
                onClick={() => {
                  setPk(i.id);
                }}
                className="b-red-500 p-2 mb-1 flex items-center space-x-2 bg-gray-100 hover:bg-slate-200 rounded-lg"
              >
                <div className="bg-slate-400 h-12 w-12 text-slate-200 border border-white flex items-center justify-center rounded-full">
                  <MdPerson size={48} />
                </div>
                <div className="flex flex-col justify-start">
                  <h2 className="font-bold text-gray-600">
                    {" "}
                    {formatDate(i.created_at)}{" "}
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-2 bg-slate-300 relative w-full  h-[90.6vh]">
            {pk === null ? (
              <p className="h-full w-full flex items-center justify-center">
                Click a chat to start messaging
              </p>
            ) : (
              <ChatScreen pk={pk} />
            )}

            {/* chat input */}
            <div className="absolute bg-slate-200 flex p-2 w-full px-6 bottom-0">
              <div className="flex items-center border border-slate-300 h-10 rounded-l-lg  overflow-hidden w-[95%]">
                <input
                  type="text"
                  name="message"
                  id="message"
                  className="outline-none w-full h-full p-2"
                  placeholder="Type your message..."
                />
              </div>
              <div className="bg-slate-600 flex items-center justify-center px-4 rounded-r-md w-[%]">
                <MdSend size={28} />
              </div>
            </div>
            {/* chat input */}
          </div>
        </div>
      </div>

      {/* main */}
    </div>
  );
}

export default Desktop;
