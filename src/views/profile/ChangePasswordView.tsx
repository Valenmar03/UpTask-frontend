import { useForm } from "react-hook-form";
import { updatePasswordForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateLoguedUserPassword } from "../../api/ProfileAPI";

export default function ChangePasswordView() {
  const initiaValues : updatePasswordForm = {
    current_password: "",
    password: "",
    password_confirmation: "",
  }

  const { register,handleSubmit,reset, watch, formState: { errors }} = useForm({defaultValues: initiaValues})

  const {mutate} = useMutation({
    mutationFn: updateLoguedUserPassword,
    onError: (error) => {
      error.message === 'Incorrect Password' &&
        toast.error('Contraseña Incorrecta')
    },
    onSuccess: () => {
      toast.success('Contraseña actulizada!')
      reset()
    }
  })

    const handleChangePassword = (formData: updatePasswordForm) => mutate(formData)

   const password = watch("password");

   return (
      <>
         <div>
            <h1 className="text-4xl">Cambiar contraseña</h1>
            <p>Aquí puedes cambiar tu contraseña</p>
         </div>

         <form 
            onSubmit={handleSubmit(handleChangePassword)}
            className=" mt-14 lg:mx-10 space-y-5  bg-white dark:bg-neutral-700 shadow-lg p-10 rounded-l"
            noValidate
        >
            <h2 className="font-semibold text-2xl">Editar Información</h2>
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="current_password"
                    className="text-lg"
                >Contaseña Actual</label>
                <input type="password" id="current_password" placeholder="Contaseña Actual"
                className={`p-3 bg-gray-200 text-black rounded ${errors.current_password && 'border-l-4 border-red-600'}`}
                {...register("current_password", {
                    required: "Contraseña actual obligatoria"
                })}/>
                {errors.current_password && <p className="text-red-600">{errors.current_password.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="password"
                    className="text-lg"
                >Nueva Contraseña</label>
                <input type="password" id="password" placeholder="Nueva Contraseña"
                  className={`p-3 bg-gray-200 text-black rounded ${errors.password && 'border-l-4 border-red-600'}`}
                  {...register("password", {
                    required: "La Contraseña es obligatoria",
                    minLength: {
                       value: 8,
                       message:
                          "La Contraseña debe ser mínimo de 8 caracteres",
                    },
                 })}
                />
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="password_confirmation"
                    className="text-lg"
                >Confirmar Nueva Contraseña</label>
                <input type="password" id="password_confirmation" placeholder="Confirmar Nueva Contraseña"
                  className={`p-3 bg-gray-200 text-black rounded ${errors.password_confirmation && 'border-l-4 border-red-600'}`}
                  {...register("password_confirmation", {
                    required: "Repetir Contraseña es obligatorio",
                    validate: (value) =>
                       value === password || "Las Contraseñas no son iguales",
                 })}
                />
                {errors.password_confirmation && <p className="text-red-600">{errors.password_confirmation.message}</p>}
            </div>
            <input
                type="submit"
                value='Cambiar Contraseña'
                className="text-white bg-purple-500 mx-auto block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"

            />
         </form>
      </>
   );
}
