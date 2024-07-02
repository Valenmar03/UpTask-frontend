import React from "react";

type ModalProps = {
   children: React.ReactNode;
   animateModal: boolean;
   closeModal: () => void
};

export default function Modal({ children, animateModal, closeModal }: ModalProps) {
   return (
      <div 
         className="fixed w-screen h-screen bg-opacity-70 inset-0 z-50 bg-black"
         onClick={closeModal}
      >
         <div
            className={
               animateModal
                  ? "transition-all duration-300 ease-in relative opacity-100"
                  : "transition-all duration-300 ease-in opacity-0"
            }
         >
            {children}
         </div>
      </div>
   );
}
