import React from 'react'

function Button({click, type,text,color,textColor}) {
  return (
    <div className='bg-slate-400 rounded-md p-2 text-center'>
        <button type={type} onClick={click} className={`${color} rounded-md text-${textColor}`}>{text}</button>
    </div>
  )
}

export default Button