import React from "react";
import { Link } from "react-router-dom";
import  logo from "../assets/images/logo.svg"

export function Navbar() {
  return (
    <nav className='sticky top-0 flex flex-row p-4 bg-shade-900 text-gray-300 text-2xl font-bold'>
      
      {/* <div className="min-w-[20vw]">
        <div className=" w-fit">
          <Link to="/"><img src={logo} className=" w-9 fill-gray-300"></img></Link>
        </div>
      </div> */}

      <div className="flex gap-4  mx-auto ">
        <Link to="/systems">Planetary systems</Link>
      </div>

      {/* <div className="flex flex-row-reverse gap-4 min-w-[20vw]">
        <span className="">Resources</span>
        <span>Docs</span>
        <a href="https://github.com/RafaelCotrim/ge13">Github</a>
        <span>About</span>
      </div> */}
    </nav>
  );
}
