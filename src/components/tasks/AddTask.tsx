import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TaskFormData } from "../../types";
import TaskForm from "./TaskForm";
import { Project } from "../../types";
import { createTask } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function AddTask({ data }: { data: Project }) {

   const initialValues : TaskFormData = {
      name: "",
      description: ""
   }
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const params = useParams()
   const projectId = params.projectId!
   const queryClient = useQueryClient()
   

   const { mutate } = useMutation({
      mutationFn: createTask,
      onError: () => {
         toast.error("Error creando tarea")
      }, 
      onSuccess: () => {
         toast.success('Tarea creada correctamente', {
            autoClose: 3000 
         })
         reset()
         queryClient.invalidateQueries({ queryKey: ["editProject", projectId]})
      }
   })

   const handleForm = (formData: TaskFormData) => {
      const data = {
         formData, 
         projectId
      }
      mutate(data)
   }

   return (
      <>
         <h2 className="text-4xl font-bold px-10">
            Nueva <span className="text-purple-600">Tarea</span>
         </h2>
         <p className="my-3 px-10">
            Agregue una tarea a{" "}
            <span className="text-purple-500">{`${data.projectName}`}</span>
         </p>

         <form
            className=" my-5 px-10 rounded-md max-w-3xl mx-auto"
            onSubmit={handleSubmit(handleForm)}
            noValidate
         >

            <TaskForm
               register={register}
               errors={errors}
            />
            <input
               type="submit"
               value="Añadir Tarea"
               className="text-white bg-purple-500 mx-auto block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"
            />
         </form>
      </>
   );
}
