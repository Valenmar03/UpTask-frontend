import api from "../lib/axios";
import { ProjectFormData } from "../types";

export async function createProject(fromData: ProjectFormData) {
   try {
      const { data } = await api.post("/projects", fromData);
      return data;
   } catch (error) {
      console.log(error);
   }
}