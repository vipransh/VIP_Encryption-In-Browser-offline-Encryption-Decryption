import React from 'react'
import { useState } from "react";
import Gallery from "./Gallery";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Decrypt() {
  const [files, setFiles] = useState([]);
    const [secretKey, setSecretKey] = useState("");
    const [decryptedFiles, setDecryptedFiles] = useState([]);
  
    const handleFileChange = (event) => {
      setFiles([...event.target.files]);
    };
  
    const base64ToArrayBuffer = (base64) => {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    };
  
    const handleDecrypt = async () => {
      if (!secretKey || files.length === 0) {
        toast.warn("Please provide a secret key and select files.");
        return;
      }
  
      const results = [];
  
      try {
        const rawKey = base64ToArrayBuffer(secretKey);
  
        const key = await crypto.subtle.importKey(
          "raw",
          rawKey,
          { name: "AES-GCM" },
          false,
          ["decrypt"]
        );
  
        for (const file of files) {
          const fileContent = await file.text();
          const { iv, encryptedData, fileName, fileType } = JSON.parse(fileContent);
          const ivBuffer = new Uint8Array(iv);
          const encryptedBuffer = new Uint8Array(encryptedData);
  
          try {
            const decryptedData = await crypto.subtle.decrypt(
              { name: "AES-GCM", iv: ivBuffer },
              key,
              encryptedBuffer
            );
  
            results.push({
              blob: new Blob([decryptedData], { type: fileType }),
              fileName,
            });
          } catch (error) {
            console.error("Decryption failed", error);
            // alert(`Failed to decrypt ${file.name}: Invalid key or corrupted file.`);
              toast.warn(`Failed to decrypt ${file.name}: Invalid key or corrupted file.`);
          }
        }
  
        setDecryptedFiles(results);
      } catch (error) {
        console.error("Decryption setup failed:", error);
        // alert("Failed to decrypt. Please check your secret key.");
          toast.warn("Failed to decrypt. Please check your secret key.!");
      }
    };

    const downloadAll=()=>{
      decryptedFiles.forEach((file)=>{
          saveAs(file.blob,file.name);
      })
    }
  
  return (
      <div className='py-16 bg-[#EAF0F1] min-h-screen'>
        <h2 className='font-bold mb-4 text-2xl'>Decryption</h2>
        <div className='flex flex-col md:flex-row items-center justify-center gap-2 w-full'>
        <div className="font-[sans-serif] w-full md:w-[30%]">
      <input type="file"
        className="w-[90%] md:w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-[#43BE31] file:hover:bg-[#45CE30] file:text-white rounded"  accept=".vip"  multiple onChange={handleFileChange}/>
  
    </div>
        
        <input
          type="text"
          placeholder="Enter secret key"
          className='w-[90%] md:w-[30%] border border-gray-400 p-2 rounded-lg'
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <button className="text-white hover:bg-[#45CE30] bg-[#43BE31] focus:outline-none focus:ring-4 focus:ring-[#019031] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2  " onClick={handleDecrypt}>Decrypt</button>
        {decryptedFiles.length!==0 && <button className="text-white hover:bg-[#45CE30] bg-[#43BE31] focus:outline-none focus:ring-4 focus:ring-[#019031] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2  " onClick={downloadAll}>Download All</button>}
        </div>
        <div style={{ marginTop: "20px" }}>
         
            <Gallery decryptedFiles={decryptedFiles}/>
        </div>
          <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
  )
}

export default Decrypt