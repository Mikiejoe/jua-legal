import React, { useEffect, useState, useRef } from "react";
import {
  MdAddComment,
  MdChat,
  MdLogout,
  MdPerson,
  MdSearch,
  MdSend,
  MdSettings,
} from "react-icons/md";
import { BASE_URL } from "../../constants";
import ChatCard from "./ChatCard";
import { useLocation, useNavigate } from "react-router-dom";

function Desktop() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pk, setPk] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [activeTab, setActiveTab] = useState("message");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const logout = () => {
   const res = confirm("Are you sure you want to logout?");
    if (res) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  }

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };

  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const getMessages = async () => {
    setLoadingMessages(true);
    if (pk === null) {
      setMessages([]);
      return;
    }
    const token = localStorage.getItem("token");
    const devurl = `${BASE_URL}/api/v1/chats/${pk}/get_messages/`;
    try {
      const res = await fetch(devurl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else {
        setChats([]);
        console.log("Error getting chats!!");
      }
    } catch (error) {
      console.log("Something went wrong");
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchUserData = async () => {
    const devurl = `${BASE_URL}/api/v1/users/user/`;
    try {
      const res = await fetch(devurl, { method: "GET", headers });
      if (res.ok) {
        const data = await res.json();
        setUsername(data.username);
        setEmail(data.email);
        localStorage.setItem("user", JSON.stringify(data));
      } else if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  const getChats = async () => {
    const devurl = `${BASE_URL}/api/v1/chats/`;
    try {
      const res = await fetch(devurl, { method: "GET", headers });
      if (res.ok) {
        const data = await res.json();
        setChats(data);
      } else if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.log("Error getting chats");
      }
    } catch (error) {
      console.log("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  const createChat = async () => {
    
    const devurl = `${BASE_URL}/api/v1/chats/`;
    try {
      const res = await fetch(devurl, { method: "POST", headers });
      if (res.ok) {
        const data = await res.json();
        setCount(count + 1);
        getChats(); // Refetch chats after creating one
      }
    } catch (error) {
      console.log("Error creating chat:", error);
    }
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  const sendMessage = async () => {
    
    setDisabled(true); // Disable the send button

    setMessage(""); // Clear the message after sending
    if (message === null || message === "") {
      alert("Please enter a message");
      return;
    }
    setMessages([...messages, { role: "user", parts: message }]);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/v1/chat/${pk}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          message: message,
        }),
      });
      if (res.ok) {
        setMessage("");
        setCount(count + 1);
        const data = await res.json();
        setMessages([...messages, { role: "user", parts: message }, data]);
      }
    } catch (error) {
      console.log("Error sending message:", error);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    getChats();
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if(location.state
      && location.state
    ){
      setPk(location.state);
    }
    getMessages();
  }, [pk]);

  useEffect(() => {
    // getMessages();
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="flex h-[100vh] bg-slate-300">
      {/* Sidebar */}
      <div className="bg-slate-400 h-full flex flex-col justify-between p-3">
        <div className="mt-16">
          <div
            onClick={createChat}
            className={`hover:bg-slate-400 hover:animate-pulse flex items-center justify-center h-12 p-2 w-12 rounded-full ${
              activeTab === "message" ? " text-gray-900" : " text-gray-600"
            }`}
          >
            <MdAddComment size={28} />
          </div>
          <div
            onClick={() => changeTab("message")}
            className={`hover:bg-slate-400 hover:animate-pulse flex items-center justify-center h-12 p-2 w-12 rounded-full ${
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
            onClick={logout}
            className="hover:bg-slate-300 hover:animate-pulse flex text-gray-800 items-center justify-center h-12 p-2 w-12 rounded-full"
          >
            <MdLogout size={28} />
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="w-full h-full">
        {/* NavBar */}
        <div className="flex shadow-md h-[10vh] shadow-slate-400 justify-between bg-slate-400 py-3 pr-3 items-center">
          <div className="flex border-[0.7px] border-gray-200 w-1/3 rounded-3xl h-8 overflow-clip px-2 items-center">
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

        {/* Chat List and Main Chat Screen */}
        <div className="grid grid-cols-3">
          {loading ? (
            <p className="h-full w-full flex items-center justify-center">
              Loading...
            </p>
          ) : (
            <div className="px-2 col-span-1 pt-2 overflow-y-scroll h-[90vh] bg-slate-400/45">
              {chats.length === 0 ? (
                <p className="h-full w-full flex items-center justify-center">
                  No chats available!!!
                </p>
              ) : (
                chats.map((chat, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if(pk ===chat.id) return;
                      setPk(chat.id);
                      getMessages(); // Check if the ID is correct
                    }}
                    className="p-2 mb-1 flex items-center space-x-2 bg-gray-100 hover:bg-slate-200 rounded-lg"
                  >
                    <div className="bg-slate-400 h-12 w-12 text-slate-200 border border-white flex items-center justify-center rounded-full">
                      <MdPerson size={48} />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-bold text-gray-600">
                        {formatDate(chat.created_at)}
                      </h2>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="col-span-2 bg-slate-300 relative w-full h-[80vh]">
            {pk === null ? (
              <p className="h-full w-full flex items-center justify-center">
                Click a chat to start messaging
              </p>
            ) : loadingMessages ? (
              <p className="px-4 h-[80vh] md:h-[80vh] flex items-center justify-center overflow-y-auto">Loading....</p>
            ) : (
              <div className="px-4 h-[80vh] md:h-[80vh] overflow-y-auto">
                <div className="p-2"></div>
                {messages.map((chat, index) => (
                  <ChatCard
                    key={index}
                    sender={chat.role}
                    message={chat.parts}
                  />
                ))}
                <div ref={chatContainerRef}></div>
              </div>
            )}

            {/* Chat Input */}
            {pk === null ? (
              <p>
              </p>
            ) : (
              <div className="bg-slate-200  flex h-[10vh] p-2 w-full px-6 bottom-0">
                <div className="flex items-center border border-slate-300 h-full w-full rounded-l-lg overflow-hidden">
                  <input
                    type="text"
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="outline-none w-full h-full p-2"
                    placeholder="Type your message..."
                  />
                </div>
                <button
                  disabled={disabled}
                  onClick={sendMessage}
                  className="border border-slate-300 rounded-r-lg flex items-center justify-center px-4 h-full bg-slate-400 hover:bg-slate-600"
                >
                  <MdSend size={24} className="text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desktop;
