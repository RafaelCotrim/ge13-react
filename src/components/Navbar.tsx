import React from "react";
import { Link } from "react-router-dom";
import  logo from "../assets/images/logo.svg"

export function Navbar() {
  return (
    <nav className='flex flex-row p-4 bg-slate-800 text-gray-300 text-2xl font-bold drop-shadow-md'>
      
      <div className="min-w-[20vw]">
        <div className=" w-fit">
          <Link to="/"><img src={logo} className=" w-9 fill-gray-300"></img></Link>
        </div>
        
      </div>

      <div className="flex gap-4  mx-auto ">
        <Link to="/stars">Stars</Link>
        <span>Solar systems</span>
        <span>Planets</span>
      </div>

      <div className="flex flex-row-reverse gap-4 min-w-[20vw]">
        <span className="">Resources</span>
        <span>Docs</span>
        <span>Github</span>
        <span>About</span>
      </div>
    </nav>
  );
}
