import { TrashIcon } from "@heroicons/react/20/solid";
import { Note, Project } from "../../types";
import { formatDate } from "../../utils/utils";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { deleteNote } from "../../api/NoteAPI";
import { toast } from "react-toastify";

export default function NoteDetail({ note, projectManager }: { note: Note, projectManager: Project['manager'] }) {

   const { data:  user } = useAuth()

   const params = useParams()
   const location = useLocation()
   const queryParams = new URLSearchParams(location.search)
   const queryClient = useQueryClient() 

   const projectId = params.projectId!
   const taskId = queryParams.get('taskId')!
   const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      data.message === "Note deleted successfully" &&
         toast.success('La nota se eliminó correctamente')
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
   })

   const handleDeleteNote = () => {
      mutate({projectId, taskId, noteId: note._id})
   }

   return (
      <div className="bg-gray-200 dark:bg-neutral-800 rounded-md py-2 pl-2 flex items-center justify-between group ">
         <div>
            <p className="text-lg">{note.content}</p>
            <p className="text-sm text-neutral-400">
               {note.createdBy.name} - <span>{formatDate(note.createdAt)}</span>
            </p>
         </div>
         {
            (user!.name === note.createdBy.name || isManager(projectManager, user!._id)) &&
            <TrashIcon 
               className="size-8 cursor-pointer opacity-0 group-hover:opacity-100 text-red-700 pr-2"
               onClick={handleDeleteNote}
            />
         }
      </div>
   );
}
