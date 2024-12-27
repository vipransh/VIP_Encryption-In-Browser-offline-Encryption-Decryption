import React from 'react'


function Popover({title,isOpen, closeModel, children}) {


    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
          closeModel(); // Close the modal when clicking on the overlay
        }
      };

    if(!isOpen) return null

    if(isOpen){
        return (
            <div  onClick={handleOverlayClick} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div id='popupbox' className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <button
                    className="text-gray-[#43BE31] hover:text-gray-[#019031] focus:outline-none"
                    aria-label="Close"
                    onClick={(e)=>closeModel(e)}
                  >
                    ✖
                  </button>
                </div>
                {children}
              </div>
            </div>
          )
    }
  
}

export default Popover