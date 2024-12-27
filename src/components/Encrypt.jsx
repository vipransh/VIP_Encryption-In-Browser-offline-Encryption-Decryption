import React, { useState } from 'react'
import { saveAs } from "file-saver";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Encrypt() {
  const [files, setFiles] = useState([]);
  const [secretKey, setSecretKey] = useState("");

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

  const handleEncrypt = async () => {
    if (!secretKey || files.length === 0) {
      toast.warn("Please provide a secret key and select files.");
      // alert("Please provide a secret key and select files.");
      return;
    }

    try {
      // Decode the Base64 secret key
      const rawKey = base64ToArrayBuffer(secretKey);

      // Import the key for encryption
      const key = await crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "AES-GCM" },
        false,
        ["encrypt"]
      );

      files.forEach(async (file) => {
        const fileData = await file.arrayBuffer();
        const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate random IV
        const encryptedData = await crypto.subtle.encrypt(
          { name: "AES-GCM", iv: iv },
          key,
          fileData
        );

        // Save encrypted file
        const encryptedBlob = new Blob(
          [
            JSON.stringify({
              iv: Array.from(iv),
              encryptedData: Array.from(new Uint8Array(encryptedData)),
              fileName: file.name,
              fileType: file.type,
            }),
          ],
          { type: "application/json" }
        );

        saveAs(encryptedBlob, `${file.name}.vip`);
      });
    } catch (error) {
      console.error("Encryption failed:", error);
      toast.warn("Failed to encrypt. Please check your secret key.!");
      // alert("Failed to encrypt. Please check your secret key.");
    }
  };
  return (
      <div  className='bg-[#EAF0F1] pt-10 w-full h-screen flex flex-col items-center justify-center'>
        <h2 className='font-bold mb-4 text-2xl'>Encryption</h2>
        <div className='flex flex-col md:flex-row items-center justify-center gap-2 w-full'>
        <input className="w-full md:w-[30%] text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-[#43BE31] file:hover:bg-[#45CE30] file:text-white rounded " aria-describedby="file_input_help" type="file"  accept=".png, .jpeg, .jpg, .mp4" multiple onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Enter secret key"
          value={secretKey}
          className='border border-gray-400 p-2 rounded-lg w-full md:w-[30%]'
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <button className="text-white hover:bg-[#45CE30] bg-[#43BE31] focus:outline-none focus:ring-4 focus:ring-[#019031] font-medium rounded-full text-sm px-5 py-2.5 text-center me-2  "  onClick={handleEncrypt}>Encrypt and Download</button>
        </div>
        <p className="text-xs text-gray-400 mt-2">PNG, JPG , Mp4, and JPEG are Allowed.</p>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
  )
}

export default Encrypt