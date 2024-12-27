import React, { useState } from 'react'

function useKeyGenerator() {
    const [generatedKey, setGeneratedKey] = useState(""); 
    const GenerateSecureKey = () => {
        // Generate a random 256-bit key (32 bytes) and encode it as Base64
        const randomKey = crypto.getRandomValues(new Uint8Array(32));
        const base64Key = btoa(String.fromCharCode(...randomKey));
        setGeneratedKey(base64Key);
      };  

  return {
    generatedKey,
    GenerateSecureKey
  };
  
}

export default useKeyGenerator