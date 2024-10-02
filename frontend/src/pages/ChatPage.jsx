import React from "react";
import { ChatScreen } from "../components";

import {
  MdArrowBack,
    MdSend,
  } from "react-icons/md";
import { useLocation } from "react-router-dom";

function ChatPage() {
  const location = useLocation()
  const pk = location.pathname.split("/")[3]
  console.log(pk)
  return (
    <div className="col-span-2 bg-slate-300 relative w-full  h-[100vh]">
      <div className="flex space-x-4 items-center p-2 shadow-md shadow-slate-100 bg-slate-200">
        <MdArrowBack size={28} color="#475569" onClick={()=>window.history.back()}/>
        <p className="text-[#475569]">Michael Joseph</p>
      </div>
      <ChatScreen pk={pk}/>

      {/* chat input */}
      <div className="absolute bg-slate-200 flex p-2 w-full sm:4 px-2 md:px-6 bottom-0">
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
  );
}

export default ChatPage;
