import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Navigate } from "react-router-dom";
import { getTaskById } from "../../api/TaskAPI";
import DetailsTask from "./DetailsTask";
import Spinner from "../Spinner";

export default function DetailsTaskModal() {
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
      queryKey: ["taskDetail", taskId],
      queryFn: () => getTaskById(reqData),
      retry: false,
   });
   console.log(isError)

   if (isError) return <Navigate to={"/404"} />;
   if(isLoading) return <Spinner></Spinner>
   if (data) 
    console.log(data)
        return (
            <DetailsTask data={data} />
        );
}
