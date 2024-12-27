import React from 'react'
import dataencryption from "../assets/dataencryption.png"

function Home() {
  return (
    <div className=' w-full h-full bg-[#EAF0F1] pt-8'>
      
      <main>
      <section className="text-gray-600 body-font">
  <div className=" mx-auto flex px-5 pt-20 md:flex-row flex-col-reverse items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Secure Your Photos and Videos, <br></br>
        <span className="hidden lg:inline-block">Anywhere, Anytime.</span>
      </h1>
      <p className="mb-8 leading-relaxed">Encrypt and decrypt your files instantly and securely, all within your browser. With AES-GCM encryption, your data stays private, never leaving your device.</p>
      <div className="flex justify-center">
      <a href='/encrypt'>
      <button type="button" className="text-white hover:bg-[#45CE30] bg-[#43BE31] focus:outline-none focus:ring-4 focus:ring-[#019031] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Encrypt</button>
      </a>
      <a href='decrypt'>
      <button type="button" className="text-white hover:bg-[#45CE30] bg-[#43BE31] focus:outline-none focus:ring-4 focus:ring-[#019031] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Decrypt</button>
      </a>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="w-[80%]" alt="hero" src={dataencryption}/>
    </div>
  </div>
</section>
      </main>
      </div>
  )
}

export default Home
