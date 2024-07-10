import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusTranslations } from "../../locales/es";
import { changeStatus } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { TaskStatus } from "../../types";
import { useNavigate } from "react-router-dom";

type statusStyles = {
   bgColorDark: string;
   textColorDark: string;
   bgColorLight: string;
   textColorLight: string;
};

const statusStyles: { [key: string]: statusStyles } = {
   pending: {
      bgColorDark: "bg-indigo-700",
      textColorDark: "text-indigo-200",
      bgColorLight: "bg-indigo-400",
      textColorLight: "text-indigo-600",
   },
   onHold: {
      bgColorDark: "bg-red-700",
      textColorDark: "text-red-300",
      bgColorLight: "bg-red-400",
      textColorLight: "text-red-800",
   },
   inProgress: {
      bgColorDark: "bg-blue-700",
      textColorDark: "text-blue-300",
      bgColorLight: "bg-blue-300",
      textColorLight: "text-blue-700",
   },
   underReview: {
      bgColorDark: "bg-orange-600",
      textColorDark: "text-orange-300",
      bgColorLight: "bg-orange-400",
      textColorLight: "text-orange-700",
   },
   completed: {
      bgColorDark: "bg-green-700",
      textColorDark: "text-green-300",
      bgColorLight: "bg-green-300",
      textColorLight: "text-green-700",
   },
};

type StatusBadgeProps = {
   status: string;
   idsData: { taskId: string; projectId: string };
};

export default function StatusBadge({ status, idsData }: StatusBadgeProps) {
   const theme = localStorage.getItem("theme");

   const navigate = useNavigate()

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
         navigate("", { replace: true });
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
               className={`font-bold ${statusStyles[key].textColorLight}
               ${statusStyles[key].bgColorLight} `}
            >
               {value}
            </option>
         ))}
      </select>
   );
}
