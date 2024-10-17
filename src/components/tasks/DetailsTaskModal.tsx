import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Navigate } from "react-router-dom";
import { getTaskById } from "../../api/TaskAPI";
import DetailsTask from "./DetailsTask";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

export default function DetailsTaskModal({canEdit} : {canEdit: boolean} ) {
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const taskId = queryParams.get("taskId")!;

   const params = useParams();
   const projectId = params.projectId!;
   const reqData = {
      taskId,
      projectId,
   };

   const { data, isLoading, isError } = useQuery({
      queryKey: ["task", taskId],
      queryFn: () => getTaskById(reqData),
      retry: false,
   });

   if (isError) {
      toast.error("Tarea no encontrada", {toastId: 'error'})
      return <Navigate to={`/projects/${projectId}`}/>
   }
   if(isLoading) return <Spinner></Spinner>
   if (data) 
        return (
            <DetailsTask data={data} canEdit={canEdit}/>
        );
}
