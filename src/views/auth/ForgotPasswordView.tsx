import { useForm } from "react-hook-form";
import { ForgotPasswordForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPassword } from "../../api/AuthAPI";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";


export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: "",
     };
  
     const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
     } = useForm({ defaultValues: initialValues });
  
     const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
           error.message === "User doesn't exist" &&
              toast.error("El usuario no existe");
        },
        onSuccess: (data) => {
           data === "Check email and follow instructions to restore password" &&
              toast.success(
                 "Revisa tu correo para restablecer la contraseña"
              );
              reset()
        },
     });
  
     const handleRequestCode = (formData: ForgotPasswordForm) =>
        mutate(formData);
  
     return (
        <>
           <h1 className="text-3xl font-black px-10 mt-5">Reestablecer Contraseña</h1>
            <p className=" font-light px-10">
                Ingresa tu correo para {""}
                <span className=" text-purple-500 font-bold">reestablecer tu constraseña</span>
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
           </nav>
        </>
  )
}
