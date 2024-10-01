import React from "react";

function ChatCard({ message, sender, user }) {
  return (
    <div className={`w-full mb-3 flex ${
          sender === user ?"justify-end":"rounded-bl-none"}`}>
      <div
        className={` flex max-w-[80%] md:max-w-[70%] py-1 px-3 rounded-3xl ${
          sender === user ?"rounded-br-none bg-slate-500":"rounded-bl-none text-slate-200 bg-slate-700"}`}
      >
        
        <p >{message}</p>
      </div>
    </div>
  );
}

export default ChatCard;
