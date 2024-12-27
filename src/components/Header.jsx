import React, { useState } from 'react'
import dataencryption from "../assets/dataencryption.png"
import Popover from './Popover'
import KeyHandler from './KeyHandler';


function Header() {
    const [isOpen,setIsOpen]=useState(false);

    const handlePopup=(e)=>{
        e.preventDefault();
        setIsOpen(true);
    }
     const closeModel=(e)=>{
        // e.preventDefault();
        setIsOpen(false);
     }
  return (
    <header className='fixed top-0  w-full bg-white  px-5 py-2 z-40'>
        <div className='relative flex flex-row items-center justify-between gap-2 '>
        <a href='/' className='flex flex-row  items-center '>
        <img alt='logo' className='h-6 w-6' src={dataencryption}/>
        <h1 className='font-bold'>VIP Encryption</h1> </a>
        <button onClick={(e)=>handlePopup(e)} type="button" className="text-white hover:bg-[#45CE30] bg-[#43BE31] focus:outline-none focus:ring-4 focus:ring-[#019031] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2  ">Generate Secure Key</button>
        </div>
        <Popover title={"Secret Key"} isOpen={isOpen} closeModel={closeModel} children={<KeyHandler/>}/>
      </header>
  )
}

export default Header