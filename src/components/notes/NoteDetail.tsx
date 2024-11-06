import { TrashIcon } from "@heroicons/react/20/solid";
import { Note } from "../../types";
import { formatDate } from "../../utils/utils";

export default function NoteDetail({ note }: { note: Note }) {
   return (
      <div className="bg-gray-200 dark:bg-neutral-800 rounded-md py-2 pl-2 flex items-center justify-between group ">
         <div>
            <p className="text-lg">{note.content}</p>
            <p className="text-sm text-neutral-400">
               {note.createdBy.name} - <span>{formatDate(note.createdAt)}</span>
            </p>
         </div>
         <TrashIcon className="size-8 cursor-pointer opacity-0 group-hover:opacity-100 text-red-700 pr-2"/>
      </div>
   );
}
