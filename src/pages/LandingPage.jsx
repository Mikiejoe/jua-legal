import React from 'react'
import { NavBar } from '../components'

function LandingPage() {
    document.title = "Jua Legal"
  return (
    <div className='bg-slate-200 h-screen w-screen'>
        <NavBar/>
    </div>
  )
}

export default LandingPage