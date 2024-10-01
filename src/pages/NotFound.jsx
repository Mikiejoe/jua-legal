import React from 'react'
import { NavBar } from '../components'

function NotFound() {
  document.title = "Jua Legal - NotFound"
  return (
    <div className='bg-slate-200 h-screen w-screen'>
        <NavBar/>
        <div className='h-full bg-red-500'>
            
        </div>
    </div>
  )
}

export default NotFound