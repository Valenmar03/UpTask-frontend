import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, ProjectFormData, dashboardProjectSchema } from "../types";

export async function createProject(fromData: ProjectFormData) {
   try {
      const { data } = await api.post("/projects", fromData);
      return data;
   } catch (error) {
      if(isAxiosError(error) && error.response){
         throw new Error(error.response.data.error)
      }
   }
}

export async function getAllProjects() {
   try {
      const { data } = await api("/projects"); // No se pone el get por que es el default en axios
      const response = dashboardProjectSchema.safeParse(data);
      if(response.success){
         return response.data
      }
   } catch (error) {
      if(isAxiosError(error) && error.response){
         throw new Error(error.response.data.error)
      }
   }
}

export async function getProjectById(id : Project['_id']) {
   try {
      const { data } = await api(`/projects/${id}`); // No se pone el get por que es el default en axios
      return data
   } catch (error) {
      if(isAxiosError(error) && error.response){
         throw new Error(error.response.data.error)
      }
   }
}
