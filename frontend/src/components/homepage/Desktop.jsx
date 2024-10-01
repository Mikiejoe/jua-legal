import React, { useState } from "react";
import {
  MdChat,
  MdLogout,
  MdPerson,
  MdSearch,
  MdSend,
  MdSettings,
} from "react-icons/md";
import ChatScreen from "./ChatScreen";

const chats = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]



function Desktop() {
    const [activeTab,setActiveTab] = useState("message");
    const changeTab = (tab)=>{
        setActiveTab(tab);
        console.log(activeTab)
    }
  return (
    <div className="flex bg-slate-300">
      {/* sidebar */}
      <div className="bg-slate-400 h-screen flex flex-col justify-between p-3">
        <div className="mt-16">
          <div onClick={()=>changeTab("message")} className={`hover:bg-slate-400 hover:animate-pulse  flex items-center justify-center h-12 p-2 w-12 rounded-full ${activeTab==='message'?" text-gray-900":" text-gray-600" }`}>
            <MdChat size={28} />
          </div>
          <div onClick={()=>changeTab("search")} className={`hover:bg-slate-400 hover:animate-pulse flex items-center justify-center h-12 p-2 w-12 rounded-full ${activeTab==='search'?" text-gray-900":" text-gray-600" }`}>
            <MdSearch size={28} />
          </div>
          <div onClick={()=>changeTab("setting")} className={`hover:bg-slate-400 hover:animate-pulse flex items-center justify-center h-12 p-2 w-12 rounded-full ${activeTab==='setting'?" text-gray-900":" text-gray-600" }`}>
            <MdSettings size={28} />
          </div>
          <div onClick={()=>changeTab("account")} className={`hover:bg-slate-400 hover:animate-pulse flex items-center justify-center h-12 p-2 w-12 rounded-full ${activeTab==='account'?" text-gray-900":" text-gray-600" }`}>
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
          <div className="flex items-center justify-center">
            <h1 className="font-semibold mr-2">Michael Joseph</h1>
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
                className="b-red-500 p-2 mb-1 flex items-center space-x-2 bg-gray-100 hover:bg-slate-200 rounded-lg"
              >
                <div className="bg-slate-400 h-12 w-12 text-slate-200 border border-white flex items-center justify-center rounded-full">
                  <MdPerson size={48} />
                </div>
                <div className="flex flex-col justify-start">
                  <h2 className="font-bold text-gray-600">Michael Joseph</h2>
                  <p className="line-clamp-2 text-[12px] text-gray-500 font-">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Enim provident nisi quo doloribus animi libero minus quae
                    sint sunt soluta voluptatem, sit ducimus voluptas fugit ex
                    neque, laborum, aut cum porro in numquam? Perspiciatis
                    soluta reprehenderit at commodi. Nulla tempore non vero
                    voluptatum et porro nisi nobis natus suscipit similique?
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-2 bg-slate-300 relative w-full  h-[90.6vh]">

                <ChatScreen/>
                
                {/* chat input */}
                <div className="absolute bg-slate-200 flex p-2 w-full px-6 bottom-0">
                    <div className="flex items-center border border-slate-300 h-10 rounded-l-lg  overflow-hidden w-[95%]">
                        <input type="text" name="message" id="message" className="outline-none w-full h-full p-2" placeholder="Type your message..." />
                    </div>
                    <div className="bg-slate-600 flex items-center justify-center px-4 rounded-r-md w-[%]">
                        <MdSend size={28}/>
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
