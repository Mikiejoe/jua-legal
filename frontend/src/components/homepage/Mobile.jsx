import React from "react";
import { MdAdd, MdChat, MdPerson, MdSearch, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const messages = [
    1,2,3,4,5,1,1,1,1,1,1,1,1,1,1
]

function Mobile() {
  const navigate = useNavigate();
  const changeScreen = (id)=>{
    navigate(`chats/${id}`)
  }

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

        {
            messages.map((i,n)=>(
                <div onClick={()=>{
                  changeScreen(i)
                }} key={n} className="b-red-500 p-2 mb-1 flex items-center space-x-2 bg-gray-100 hover:bg-slate-200 rounded-lg">
                <div className="bg-slate-400 h-12 w-12 text-slate-200 border border-white flex items-center justify-center rounded-full">
                  <MdPerson size={48} />
                </div>
                <div className="flex flex-col justify-start">
                  <h2 className="font-bold text-gray-600">Michael Joseph</h2>
                  <p className="line-clamp-2 text-[12px] text-gray-500 font-">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                    provident nisi quo doloribus animi libero minus quae sint sunt
                    soluta voluptatem, sit ducimus voluptas fugit ex neque, laborum,
                    aut cum porro in numquam? Perspiciatis soluta reprehenderit at
                    commodi. Nulla tempore non vero voluptatum et porro nisi nobis
                    natus suscipit similique?
                  </p>
                </div>
              </div>
            ))
        }


       
      </div>
      {/* End */}

      {/* add converstaion button */}
      <div className="bg-slate-400 h-12 w-12 text-slate-200 flex items-center justify-center rounded-full absolute right-4 bottom-20 shadow-slate-700 shadow-lg hover:animate-bounce">
        <MdAdd size={28} />
      </div>
      {/* end */}

      {/* bottom navigation bar */}
      <div className="bg-slate-300 gap-2 justify-around px-4 py-2 w-full absolute bottom-0 flex right-0">
        <div className="hover:bg-slate-400 hover:animate-pulse flex text-gray-700 items-center justify-center h-12 p-2 w-12 rounded-full">
            <MdChat size={28}/>
        </div>
        <div className="hover:bg-slate-400 hover:animate-pulse flex text-gray-700 items-center justify-center h-12 p-2 w-12 rounded-full">
            <MdSearch size={28}/>
        </div>
        <div className="hover:bg-slate-400 hover:animate-pulse flex text-gray-700 items-center justify-center h-12 p-2 w-12 rounded-full">
            <MdSettings size={28}/>
        </div>
        <div className="hover:bg-slate-400 hover:animate-pulse flex text-gray-700 items-center justify-center h-12 p-2 w-12 rounded-full">
            <MdPerson size={28}/>
        </div>
        
        
      </div>
      {/* end */}
    </div>
  );
}

export default Mobile;
