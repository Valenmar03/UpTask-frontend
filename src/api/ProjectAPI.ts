import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, ProjectFormData, dashboardProjectsSchema, editProjectSchema, projectSchema } from "../types";

export async function createProject(formData: ProjectFormData) {
   try {
      const { data } = await api.post("/projects", formData);
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
      const response = dashboardProjectsSchema.safeParse(data);
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
      const { data } = await api(`/projects/${id}`);
      const response = editProjectSchema.safeParse(data);
      if(response.success) return response.data
   } catch (error) {
      if(isAxiosError(error) && error.response){
         throw new Error(error.response.data.error)
      }
   }
}

export async function getFullProjectById(id : Project['_id']) {
   try {
      const { data } = await api(`/projects/${id}`);
      const response = projectSchema.safeParse(data);
      if(response.success) return response.data
   } catch (error) {
      if(isAxiosError(error) && error.response){
         throw new Error(error.response.data.error)
      }
   }
}

type ProjectAPIType = {
   formData: ProjectFormData;
   projectId: Project['_id'];
}

export async function updateProject({ formData, projectId } : ProjectAPIType) {
   try {
      const { data } = await api.put(`/projects/${projectId}`, formData);
      return data
   } catch (error) {
      if(isAxiosError(error) && error.response){
         throw new Error(error.response.data.error)
      }
   }
}

export async function deleteProject(id : Project['_id']) {
   try {
      const { data } = await api.delete(`/projects/${id}`);
      return data
   } catch (error) {
      if(isAxiosError(error) && error.response){
         throw new Error(error.response.data.error)
      }
   }
}
