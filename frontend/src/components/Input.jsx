import React from 'react'

function Input({placeholder, type,value,onChange,name,error}) {
  return (
    <div className={`w-full h-10 mb-2 border-[0.6px] ${error?"border-red-500":"border-gray-400"}   rounded-md overflow-clip`}>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} className='w-full bg-transparent h-full p-2 outline-none'/>
    </div>
  )
}

export default Input