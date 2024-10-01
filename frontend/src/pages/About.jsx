import React from 'react'
import { NavBar } from '../components'

function About() {
  document.title = "Jua Legal - About"
  return (
    <div className='bg-slate-200 h-screen w-screen'>
        <NavBar/>
    </div>
  )
}

export default About