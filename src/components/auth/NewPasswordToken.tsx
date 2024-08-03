import { PinInput, PinInputField } from "@chakra-ui/pin-input";

export default function () {

    const handleChange = (token:string) => {

    }
    const handleComplete = (token:string) => {
        
    }

   return (
      <form className="space-y-3 px-10 py-4">
         <label className="font-normal text-lg text-center block">
            Código de 6 dígitos
         </label>
         <div className="flex justify-center gap-5 text-black">
            <PinInput
               value={'123'}
               onChange={handleChange}
               onComplete={handleComplete}
            >
               <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100" />
               <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100" />
               <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100" />
               <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100" />
               <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100" />
               <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100" />
            </PinInput>
         </div>
      </form>
   );
}
