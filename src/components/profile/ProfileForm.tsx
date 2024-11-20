import { useForm } from "react-hook-form";
import { User, UserProfileForm } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../api/ProfileAPI";
import { toast } from "react-toastify";

type ProfileFormProps = {
   data: User;
};

export default function ProfileForm({ data }: ProfileFormProps) {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: data });

   const queryClient = useQueryClient()

   const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (err) => {
        err.message === 'Email already exists' && 
            toast.error('El correo ya existe')
    },
    onSuccess:() => {
        toast.success('Perfil actualzado')
        queryClient.invalidateQueries({queryKey: ['user']})
    }
   })

   const handleEditProfile = (formData : UserProfileForm) => mutate(formData)


   return (
      <>
         <div>
            <h1 className="text-4xl">
               Hola <span className="text-purple-500 font-bold">{data.name}.</span>
            </h1>
            <p>Aquí puedes modificar tus datos personales.</p>
         </div>
         <form 
            onSubmit={handleSubmit(handleEditProfile)}
            className=" mt-14 lg:mx-10 space-y-5  bg-white dark:bg-neutral-700 shadow-lg p-10 rounded-l"
            noValidate
        >
            <h2 className="font-semibold text-2xl">Editar Información</h2>
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="name"
                    className="text-lg"
                >Nombre</label>
                <input type="text" id="name" placeholder="Tu nombre"
                className={`p-3 bg-gray-200 text-black rounded ${errors.name && 'border-l-4 border-red-600'}`}
                {...register("name", {
                    required: "Nombre de usuario obligatorio"
                })}/>
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="name"
                    className="text-lg"
                >Email</label>
                <input type="text" id="name" placeholder="Tu nombre"
                className={`p-3 bg-gray-200 text-black rounded ${errors.email && 'border-l-4 border-red-600'}`}
                {...register("email", {
                    required: "Correo obligatorio"
                })}/>
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <input
                type="submit"
                value='Guardar Cambios'
                className="text-white bg-purple-500 mx-auto block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"

            />
         </form>
      </>
   );
}
