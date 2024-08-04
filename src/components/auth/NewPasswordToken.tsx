import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { validateToken } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { ValidateToken } from "../../types";

type NewPasswordTokenProps = {
   token: ValidateToken["token"];
   setToken: React.Dispatch<React.SetStateAction<string>>;
   setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewPasswordToken({
   token,
   setToken,
   setIsValidToken,
}: NewPasswordTokenProps) {
   const { mutate } = useMutation({
      mutationFn: validateToken,
      onError: (error) => {
         error.message === "Invalid Token" && toast.error("Token inválido");
      },
      onSuccess: (data) => {
         data === "Valid token, define your new password" &&
            toast.success("Token válido. Define tu nueva contraseña");
         setIsValidToken(true);
      },
   });

   const handleChange = (token: ValidateToken["token"]) => {
      setToken(token);
   };
   const handleComplete = (token: ValidateToken["token"]) => mutate({ token });

   return (
      <form className="space-y-3 px-10 py-4">
         <label className="font-normal text-lg text-center block">
            Código de 6 dígitos
         </label>
         <div className="flex justify-center gap-5 text-black">
            <PinInput
               value={token}
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
