import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/ErrorMessage";

export default function RequestNewCodeView() {
   const initialValues: RequestConfirmationCodeForm = {
      email: "",
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const { mutate } = useMutation({
      mutationFn: requestConfirmationCode,
      onError: (error) => {
         error.message === "User doesn't exist" &&
            toast.error("El usuario no existe");
         error.message === "User is already confirmed" &&
            toast.error("El usuario ya esta confirmado");
      },
      onSuccess: (data) => {
         data === "A new confirmation code was sent, check email to confirm" &&
            toast.success(
               "Se envió un nuevo código de confirmacion, revisa tu correo para confirmarlo"
            );
      },
   });

   const handleRequestCode = (formData: RequestConfirmationCodeForm) =>
      mutate(formData);

   return (
      <>
         <h1 className="text-3xl font-black ">Solicitar nuevo código</h1>
         <p className=" font-light ">
            Ingresa tu correo y recibirás un {""}
            <span className=" text-purple-500 font-bold"> nuevo código</span>
         </p>
         <form
            className="space-y-3 px-10 py-4"
            onSubmit={handleSubmit(handleRequestCode)}
         >
            {Object.keys(errors).length !== 0 && (
               <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
            <label className="font-normal text-lg block" htmlFor="email">
               Email
            </label>
            <input
               id="email"
               type="text"
               placeholder="example@email.com"
               className="w-full p-3  border border-gray-200 rounded bg-gray-200 text-black"
               {...register("email", {
                  required: "El Email de registro es obligatorio",
                  pattern: {
                     value: /\S+@\S+\.\S+/,
                     message: "E-mail no válido",
                  },
               })}
            />
            <input
               type="submit"
               value="Enviar Código"
               className="text-white bg-purple-500 mx-auto block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"
            />
         </form>

         <nav className=" flex flex-col space-y-2 text-center mt-3">
            <p className="text-sm">
               ¿Ya tienes cuenta?{" "}
               <Link to="/auth/login" className="text-purple-500">
                  Iniciar Sesión
               </Link>
            </p>
            <p className="text-sm">
               ¿Olvidaste tu contraseña?{" "}
               <Link to="/auth/forgot-password" className="text-purple-500">
                  Reestablecer
               </Link>
            </p>
         </nav>
      </>
   );
}
