import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectAPI";
import Spinner from "../../components/Spinner";
import EditProjectForm from "../../components/projects/EditProjectForm";

export default function EditProjectView() {
   const params = useParams();
   const projectId = params.projectId!;

   const { data, isLoading, isError } = useQuery({
      queryKey: ["project", projectId],
      queryFn: () => getProjectById(projectId),
      retry: false,
   });


   if(isLoading) return <Spinner></Spinner>
   if(isError) return <Navigate to={'/404'}/>
   if(data) return <EditProjectForm data={data}/>
}
