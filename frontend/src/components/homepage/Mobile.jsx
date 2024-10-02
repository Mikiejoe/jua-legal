import React, { useEffect, useState } from "react";
import { MdAdd, MdChat, MdPerson, MdSearch, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

function Mobile() {
  const navigate = useNavigate();
  const changeScreen = (id) => {
    navigate(`chats/${id}`);
  };
  const [chats, setChats] = useState([]);
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

  const createChat = async () => {
    const token = localStorage.getItem("token");
    const devurl = `${BASE_URL}/api/v1/chats/`;

    console.log(token);
    try {
      const res = await fetch(devurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (res) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  const getChats = async () => {
    const token = localStorage.getItem("token");
    const devurl = `${BASE_URL}/api/v1/chats/`;
    try {
      const res = await fetch(devurl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (res) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          const data = await res.json();
          console.log(data);
          setChats(data);
        }
      } else {
        console.log("Error getting chats!!");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="h-screen relative">
      {/* navbar */}
      <div className="flex justify-between items-center bg-slate-400  px-2 py-4">
        <h1 className="text-3xl font-medium text-gray-700 pl-4">Chats</h1>
        <div className="bg-slate-300 h-10 w-10 text-slate-400 border-[2px] border-white flex items-center justify-center rounded-full">
          <MdPerson size={48} />
        </div>
      </div>
      {/* End of navbar */}

      {/* List of conversations */}
      <div className="px-2 pt-2 overflow-y-scroll h-[77vh]">
        {chats.map((chat, n) => (
          <div
            onClick={() => {
              changeScreen(chat.id);
            }}
            key={n}
            className="b-red-500 p-2 mb-1 flex items-center space-x-2 bg-gray-100 hover:bg-slate-200 rounded-lg"
          >
            <div className="bg-slate-400 h-12 w-12 text-slate-200 border border-white flex items-center justify-center rounded-full">
              <MdPerson size={48} />
            </div>
            <div className="flex flex-col justify-start">
              <h2 className="font-bold text-gray-600">{formatDate(chats.created_at)}</h2>
              
            </div>
          </div>
        ))}
      </div>
      {/* End */}

      {/* add converstaion button */}
      <div
        onClick={createChat}
        className="bg-slate-400 h-12 w-12 text-slate-200 flex items-center justify-center rounded-full absolute right-4 bottom-20 shadow-slate-700 shadow-lg hover:animate-bounce"
      >
        <MdAdd size={28} />
      </div>
      {/* end */}

      {/* bottom navigation bar */}
      <div className="bg-slate-300 gap-2 justify-around px-4 py-2 w-full absolute bottom-0 flex right-0">
        <div className="hover:bg-slate-400 hover:animate-pulse flex text-gray-700 items-center justify-center h-12 p-2 w-12 rounded-full">
          <MdChat size={28} />
        </div>
        <div className="hover:bg-slate-400 hover:animate-pulse flex text-gray-700 items-center justify-center h-12 p-2 w-12 rounded-full">
          <MdSearch size={28} />
        </div>
        <div className="hover:bg-slate-400 hover:animate-pulse flex text-gray-700 items-center justify-center h-12 p-2 w-12 rounded-full">
          <MdSettings size={28} />
        </div>
        <div className="hover:bg-slate-400 hover:animate-pulse flex text-gray-700 items-center justify-center h-12 p-2 w-12 rounded-full">
          <MdPerson size={28} />
        </div>
      </div>
      {/* end */}
    </div>
  );
}

export default Mobile;
