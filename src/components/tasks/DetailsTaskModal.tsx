import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Navigate } from "react-router-dom";
import { getTaskById } from "../../api/TaskAPI";
import DetailsTask from "./DetailsTask";
import Spinner from "../Spinner";

export default function DetailsTaskModal({ statusSelectedTask } : {statusSelectedTask: string}) {
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

   if (isError) return <Navigate to={"/404"} />;
   if(isLoading) return <Spinner></Spinner>
   if (data) 
        return (
            <DetailsTask data={data} status={statusSelectedTask}/>
        );
}
