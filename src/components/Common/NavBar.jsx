import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();
    const name = location.pathname.replace("/","");
  return (
    <div className="flex justify-around items-center px-2 py-4 md:p-4 font-medium bg-slate-300 shadow-md">
        <Link to="/" className="text-2xl hidden sm:block">Jua Legal</Link>
        <Link to="/" className="text-2xl h-6 w-6 bg-red-950 rounded-full"></Link>
      <div className="md:space-x-4 space-x-2">
        <Link to="/about" className={`hover:border-b-[2px] ${name==="about"?"border-b-[2px]":"" } hover:text-slate-100 border-slate-900 md:p-2`}>About</Link>
        <Link to='/contact' className={`hover:border-b-[2px] ${name==="contact"?"border-b-[2px]":"" } md:p-2 hover:text-slate-100 border-slate-900`}>Contact</Link>
        <Link to="/login" className="md:py-2 py-1 px-2 md:px-4 border rounded-full hover:border-slate-100 hover:text-slate-100 border-slate-500">Get Started</Link>
      </div>
    </div>
  );
}

export default NavBar;
