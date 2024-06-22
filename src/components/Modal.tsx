import React from "react";

type ModalProps = {
    children: React.ReactNode
    animateModal: boolean
}

export default function Modal({children, animateModal} : ModalProps) {

   return (
      <div className="fixed w-screen h-screen bg-opacity-70 inset-0 z-50 bg-black">
         <div
            className={
               animateModal
                  ? "transition-all duration-300 ease-in relative opacity-100"
                  : "transition-all duration-300 ease-in opacity-0"
            }
         >
            <div className="bg-gray-100 dark:bg-neutral-800 h-fit w-fit md:w-1/4 p-5 mt-64 md:mx-auto rounded-md transition-all ease-in duration-300 mx-auto">
               {children}
            </div>
         </div>
      </div>
   );
}
