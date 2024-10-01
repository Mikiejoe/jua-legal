import React from "react";
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
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt omnis delectus fugiat, minima iste accusantium aliquam saepe voluptates, nemo voluptatum sapiente quis inventore neque deleniti unde reiciendis impedit voluptate odit?",
  },
  {
    sender: "mike",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt omnis delectus fugiat, minima iste accusantium aliquam saepe voluptates, nemo voluptatum sapiente quis inventore neque deleniti unde reiciendis impedit voluptate odit?",
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
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt omnis delectus fugiat, minima iste accusantium aliquam saepe voluptates, nemo voluptatum sapiente quis inventore neque deleniti unde reiciendis impedit voluptate odit?",
  },
  {
    sender: "mike",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt omnis delectus fugiat, minima iste accusantium aliquam saepe voluptates, nemo voluptatum sapiente quis inventore neque deleniti unde reiciendis impedit voluptate odit?",
  },
];

function ChatScreen() {
  return (
    <div className="px-4 h-[84vh] md:h-[82.6vh] overflow-y-auto">
      <div className="p-2"></div>
      {messages.map((message, index) => (
        <ChatCard
        key={index}
          sender={message.sender}
          message={message.message}
          user={user}
        />
      ))}
    </div>
  );
}

export default ChatScreen;
