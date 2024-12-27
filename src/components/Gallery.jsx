import React, { useState } from 'react'
import Popover from './Popover'
import GalleryView from './GalleryView'
import downloadIcon from "../assets/downloadIcon.png"
import { saveAs } from "file-saver";

function Gallery({decryptedFiles}) {
  const [isOpen,setIsOpen]=useState(false);
  const [fileView,setFileview]=useState("");
  
      const handlePopup=(e,file)=>{
          e.preventDefault();
          setFileview(file);
          setIsOpen(true);
      }
       const closeModel=(e)=>{
          // e.preventDefault();
          setIsOpen(false);
       }
       const downloadSingleFile=(e,index)=>{
        e.preventDefault();
         saveAs(decryptedFiles[index].blob,decryptedFiles[index].name);
       }
  return (
    

<div className="flex flex-row flex-wrap items-center justify-center gap-4 w-full px-2 ">
        {decryptedFiles.map((file, index) => (
            <div  key={index} className='relative cursor-pointer w-full flex items-center justify-center md:w-1/4 h-[250px] md:h-[200px]'>
            <button onClick={(e)=>downloadSingleFile(e,index)} className='absolute right-2 top-2'>
            <img className=' h-6 hover:scale-125 bg-[#43BE31] w-6 rounded-xs shadow-lg' alt='down-icon' src={downloadIcon}/>
            </button>
              {file.fileName.endsWith(".jpg") || file.fileName.endsWith(".png") || file.fileName.endsWith(".jpeg") ? (
                <img
                  onClick={(e)=>handlePopup(e,file)}
                  src={URL.createObjectURL(file.blob)}
                  alt={file.fileName}
                  className="w-full h-full object-cover object-top rounded-lg border border-gray-500"
                />
              ) : (
                <video
                  controls
                  style={{ width: "300px" ,height: "150px" }}
                  src={URL.createObjectURL(file.blob)}
                  onClick={(e)=>handlePopup(e,file)}
                ></video>
              )}
    </div>
          ))}
          <Popover title={"File Viewer"} isOpen={isOpen} closeModel={closeModel} children={<GalleryView file={fileView}/>}/>
</div>
  )
}

export default Gallery