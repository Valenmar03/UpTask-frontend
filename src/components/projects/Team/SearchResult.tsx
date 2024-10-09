import { toast } from "react-toastify";
import { addMemberToTeam } from "../../../api/TeamAPI";
import { TeamMember } from "../../../types";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type SearchResultProps = {
   user: TeamMember;
};

export default function SearchResult({ user }: SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!

    const {mutate} = useMutation({
        mutationFn: addMemberToTeam,
        onError: (error) => {
            toast.error(error.message === "User not found" ? "Usuario no Encontrado" : "El usuario ya forma parte del equipo")
        },
        onSuccess() {
            toast.success("Usuario agregado correctamente")
        },
    })

    const handleAddUserToTeam = () => {
        const data = {
            projectId,
            id: user._id
        }
        mutate(data)
    }
   return (
      <>
         <div className="flex justify-around items-center mx-10 border-t-2 dark:border-t-neutral-700 pt-2">
            <p>{user.name}</p>
            <button 
                className="text-purple-500 px-3 py-2 rounded-md hover:bg-purple-200 dark:hover:bg-neutral-700"
                onClick={handleAddUserToTeam}    
            >
               Agregar al proyecto
            </button>
         </div>
      </>
   );
}
