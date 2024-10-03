import React, { useEffect, useState,useRef} from "react";
import ChatCard from "./ChatCard";
//

import { BASE_URL } from "../../constants";

function ChatScreen({ pk,count }) {
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
      console.log(res)
      if (res.ok) {
        const data = await res.json();
        console.log("chats ",data);
        setChats(data);
      } else {
        setChats([])
        console.log("Error getting chats!!");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    getChats();
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [count]);
  return (
    <div ref={chatContainerRef} className="px-4 h-[80vh] md:h-[82.6vh] overflow-y-auto">
      <div className="p-2"></div>

      {chats.map((chat, index) => (
        <ChatCard
          key={index}
          sender={chat.role}
          message={chat.parts}
        />
      ))}
    </div>
  );
}

export default ChatScreen;
