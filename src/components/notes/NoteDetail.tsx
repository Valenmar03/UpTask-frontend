import { TrashIcon } from "@heroicons/react/20/solid";
import { Note, Project } from "../../types";
import { formatDate } from "../../utils/utils";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policies";

export default function NoteDetail({ note, projectManager }: { note: Note, projectManager: Project['manager'] }) {

   const { data:  user } = useAuth()

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
               onClick={() => {}}
            />
         }
      </div>
   );
}
