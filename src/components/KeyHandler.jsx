import React, { useEffect } from 'react'
import useKeyGenerator from '../hooks/useKeyGenerator';
import clipboard from "../assets/clipboard.png"


function KeyHandler() {
 const {generatedKey,GenerateSecureKey}= useKeyGenerator();
    useEffect(()=>{
          GenerateSecureKey();
    },[])
  return (
    <div>
    <div className="mt-4">
                  <p className="text-gray-600">
                  Please copy the <span className='font-bold'>Secret key</span> and <span className='font-bold'>store it safely;</span> if the secure key is lost, it would not be possible to decrypt the data.
                  </p>
    <div className='flex flex-row items-center justify-center gap-2 mt-2'>
      <input className='w-[80%] border border-gray-400 p-2 rounded-lg' id="link"
              defaultValue={`${generatedKey}`}
              readOnly/>
      <button onClick={() => {navigator.clipboard.writeText(generatedKey)}} className='border-2 rounded-lg border-[#43BE31] p-1 focus:outline-none focus:ring-4 focus:ring-[#019031]'>
        <img src={clipboard}/>
      </button>
    </div>
    </div>
    <div className="mt-6 flex justify-end space-x-3">
        <button onClick={GenerateSecureKey} className="px-4 py-2 bg-[#43BE31] text-white rounded ">
                    Re-Generate
          </button>
    </div>
    </div>
  )
}

export default KeyHandler