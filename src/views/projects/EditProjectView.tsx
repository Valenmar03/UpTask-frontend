import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectAPI";
import Spinner from "../../components/Spinner";

export default function EditProjectView() {
   const params = useParams();
   const projectId = params.projectId!;

   const { data, isLoading, error } = useQuery({
      queryKey: ["editProject", projectId],
      queryFn: () => getProjectById(projectId),
      retry: false,
   });

   return (
     <div>{isLoading ? <Spinner></Spinner> : (
        <p>Hola</p>
     )}</div>
    );
}
