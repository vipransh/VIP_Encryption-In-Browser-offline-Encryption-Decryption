import React from 'react'

function GalleryView({file}) {
    if(!file) return null
  return (
    <div className='w-full  flex items-center justify-center'>
        {file.fileName?.endsWith(".jpg") || file?.fileName.endsWith(".png") ? (
                <img
                  src={URL.createObjectURL(file?.blob)}
                  alt={file?.fileName}
                  className="w-full h-full max-h-[90vh] md:max-h-[80vh] object-scale-down rounded-lg shadow-lg"
                />
              ) : (
                <video
                  controls
                  style={{ width: "300px" ,height: "80%" }}
                  className='md:max-h-[80vh] max-h-[90vh] md:w-[300px] w-full'
                  src={URL.createObjectURL(file?.blob)}
                ></video>
              )}
    </div>
  )
}

export default GalleryView