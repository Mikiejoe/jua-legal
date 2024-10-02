import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";

const user = "mike";
const messages = [
  {
    sender: "mike",
    message: "Hello there",
  },
  {
    sender: "john",
    message: "I am good",
  },
  {
    sender: "mike",
    message: "nice to hear that!!",
  },
  {
    sender: "john",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt omnis delectus fugiat, minima iste accusantium aliquam saepe voluptates, nemo voluptatum sapiente quis inventore neque deleniti unde reiciendis impedit voluptate odit?",
  },
  {
    sender: "mike",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt omnis delectus fugiat, minima iste accusantium aliquam saepe voluptates, nemo voluptatum sapiente quis inventore neque deleniti unde reiciendis impedit voluptate odit?",
  },
  {
    sender: "mike",
    message: "Hello there",
  },
  {
    sender: "john",
    message: "I am good",
  },
  {
    sender: "mike",
    message: "nice to hear that!!",
  },
  {
    sender: "john",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt omnis delectus fugiat, minima iste accusantium aliquam saepe voluptates, nemo voluptatum sapiente quis inventore neque deleniti unde reiciendis impedit voluptate odit?",
  },
  {
    sender: "mike",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt omnis delectus fugiat, minima iste accusantium aliquam saepe voluptates, nemo voluptatum sapiente quis inventore neque deleniti unde reiciendis impedit voluptate odit?",
  },
];

function ChatScreen({ pk }) {
  const [chats, setChats] = useState([]);
  const getChats = async () => {
    const token = localStorage.getItem("token");
    const devurl = `http://127.0.0.1:8000/api/v1/chats/${pk}/get_messages`;
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
        console.log(data);
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
  }, []);
  return (
    <div className="px-4 h-[84vh] md:h-[82.6vh] overflow-y-auto">
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
