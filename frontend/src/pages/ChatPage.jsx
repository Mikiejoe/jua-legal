import React, { useState, useRef, useEffect } from "react";
import { ChatScreen } from "../components";
import { ChatCard } from "../components";

import { MdArrowBack, MdSend } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

function ChatPage() {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const pk = location.pathname.split("/")[3];
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const chatContainerRef = useRef(null);
  const [chats, setChats] = useState([]);
  const getChats = async () => {
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
        setChats(data);
        chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        setChats([]);
        // console.log("Error getting chats!!");
      }
    } catch (error) {
      // console.log("Something went wrong");
    }
  };

  useEffect(() => {
    getChats();
    chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const sendMessage = async () => {
    setDisabled(true);
    if (message === null || message === "") {
      alert("Please enter a message");
      return;
    }
    setChats([...chats, { role: "user", parts: message }]);
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
        const data = await res.json();
        // console.log(data)
        setChats([...chats, { role: "user", parts: message }, data]);
        setCount(count + 1);
      }
    } catch (error) {
      // console.log("Something went wrong");
    } finally {
      setMessage("");
      setDisabled(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        navigate("/home", {
          state: pk,
        }); // Navigate to /home if screen width is more than 768px
      }
    };

    // Check screen size on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);
  // console.log(window.innerWidth);
  return (
    <div className="col-span-2 bg-slate-300 relative w-full h-[100vh]">
      <div className="flex space-x-4 items-center h-[10vh] p-2 shadow-md shadow-slate-100 bg-slate-200">
        <MdArrowBack
          size={28}
          color="#475569"
          onClick={() => window.history.back()}
        />
        <p className="text-[#475569]">Michael Joseph</p>
      </div>
      <div className="px-4 h-[80vh] md:h-[80vh] overflow-y-auto">
        <div className="p-2"></div>

        {chats.map((chat, index) => (
          <ChatCard key={index} sender={chat.role} message={chat.parts} />
        ))}
        <div ref={chatContainerRef}></div>
      </div>

      {/* chat input */}
      <div className="absolute h-[10vh] bg-slate-200 flex p-2 w-full sm:4 px-2 md:px-6 bottom-0">
        <div className="flex items-center border border-slate-300 h-10 rounded-l-lg  overflow-hidden w-[95%]">
          <input
            type="text"
            name="message"
            id="message"
            className="outline-none w-full h-full p-2"
            placeholder="Type your message..."
            value={message}
            onChange={handleChange}
          />
        </div>
        <button
          disabled={disabled}
          className="bg-slate-600  flex items-center justify-center px-4 rounded-r-md w-[%]"
        >
          <MdSend onClick={sendMessage} size={28} />
        </button>
      </div>
      {/* chat input */}
    </div>
  );
}

export default ChatPage;
