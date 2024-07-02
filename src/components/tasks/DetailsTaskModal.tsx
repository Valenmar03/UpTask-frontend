import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Navigate } from "react-router-dom"
import { getTaskById } from "../../api/TaskAPI";
import DetailsTask from "./DetailsTask";

export default function DetailsTaskModal() {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('taskId')!

    const params = useParams();
   const projectId = params.projectId!;
   const reqData = {
    taskId,
    projectId
   }

   const { data, isError } : {data: any, isError: boolean} = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getTaskById(reqData),
    retry: false,
 });

   if (isError) return <Navigate to={"/404"} />;
   if (data) {
    <DetailsTask
        data={data}
    />
   }
}
