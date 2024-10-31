import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusTranslations } from "../../locales/es";
import { changeStatus } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { TaskStatus } from "../../types";
import { statusStyles } from "../../locales/StatusStyles";



type StatusBadgeProps = {
   status: string;
   idsData: { taskId: string; projectId: string };
};

export default function StatusBadge({ status, idsData }: StatusBadgeProps) {
   const theme = localStorage.getItem("theme");


   const queryClient = useQueryClient()
   const { mutate } = useMutation({
      mutationFn: changeStatus,
      onError:() => {
         toast.error("Error cambiando el estado")
      },
      onSuccess: () => {
         toast.success('Estado modificado correctamente')
         queryClient.invalidateQueries({queryKey: ['project', idsData.projectId]})
         queryClient.invalidateQueries({queryKey: ['task', idsData.taskId]})
      }
   })

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const data = {
         ...idsData!,
         status: e.target.value as TaskStatus
      }
      mutate(data)
   }

   return (
      <select
         className={`my-3 ml-10 inline py-1 px-2 rounded-xl text-sm font-bold cursor-pointer ${
            theme === "light"
               ? statusStyles[status].bgColorLight
               : statusStyles[status].bgColorDark
         } 
         ${
            theme === "light"
               ? statusStyles[status].textColorLight
               : statusStyles[status].textColorDark
         }
         `}
         defaultValue={status}
         onChange={handleChange}
      >
         {Object.entries(statusTranslations).map(([key, value]) => (
            <option
               key={key}
               value={key}
               className={`font-bold 
                  ${statusStyles[key].textColorLight}
                  ${statusStyles[key].bgColorLight} 
                  ${`dark:${statusStyles[key].bgColorDark}`} 
                  ${`dark:${statusStyles[key].textColorDark}`}
               `}
            >
               {value}
            </option>
         ))}
      </select>
   );
}
