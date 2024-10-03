import React from "react";

function ChatCard({ message, sender }) {
  const formatResponse = (text) => {
    if (typeof text !== 'string') {
      text = String(text); // Convert to string if not already
    }
    const formattedText = text
      .replace(/\n/g, '<br />')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return { __html: formattedText };
  };
  return (
    <div className={`w-full mb-3 flex ${
          sender === "user" ?"justify-end":"rounded-bl-none"}`}>
      <div
        className={` flex max-w-[80%] md:max-w-[70%] py-1 px-3  break-words whitespace-pre-wrap rounded-3xl ${
          sender === "user" ?"rounded-br-none bg-slate-500":"rounded-bl-none text-slate-200 bg-slate-700"}`}
      >
        
        <p dangerouslySetInnerHTML={formatResponse(message)} />
      </div>
    </div>
  );
}

export default ChatCard;
