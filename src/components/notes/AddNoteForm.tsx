import { useForm } from "react-hook-form";
import { NoteFormData } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export default function AddNoteForm() {
   const initialValues: NoteFormData = {
      content: "",
   };

   const params = useParams()
   const location = useLocation()
   const queryParams = new URLSearchParams(location.search)

   const projectId = params.projectId!
   const taskId = queryParams.get('taskId')!

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      reset()
    }
   })

   const handleAddNote = (formData: NoteFormData) => {
      mutate({projectId, taskId, formData})
   }

   return (
      <form onSubmit={handleSubmit(handleAddNote)} noValidate>
         <div className="grid gap-1 grid-cols-10 w-full">
            <input
               id="content"
               type="text"
               className="bg-gray-200 dark:bg-neutral-800 rounded-md py-2 pl-2 col-span-8"
               {...register("content", {
                  required: "La nota debe tener contenido",
               })}
            />
            <input
               type="submit"
               value="+"
               className="bg-blue-200 hover:bg-blue-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-3xl rounded-md cursor-pointer  col-span-2 duration-200 text-center text-blue-700 dark:text-gray-200 w-full"
            />
         </div>
         {errors.content && (
            <p className="text-sm text-red-400 dark:text-red-700">
               {errors.content.message}
            </p>
         )}
      </form>
   );
}
