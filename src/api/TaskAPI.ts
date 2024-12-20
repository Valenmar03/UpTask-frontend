import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, Task, TaskFormData, taskSchema, TaskStatus } from "../types";

type TaskAPI = {
    formData: TaskFormData;
    projectId: Project['_id'];
    taskId: Task['_id'];
    status: TaskStatus;
}

export async function createTask({formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'>){
    try {
        const url = `/projects/${projectId}/tasks`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getTaskById({ taskId, projectId } : Pick<TaskAPI, 'taskId' | 'projectId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api(url)
        const response = taskSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateTask({projectId, taskId, formData} : Pick<TaskAPI, 'taskId' | 'projectId' | 'formData'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteTask({ taskId, projectId } : Pick<TaskAPI, 'taskId' | 'projectId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function changeStatus({ taskId, projectId, status } : Pick<TaskAPI, 'taskId' | 'projectId' | 'status'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`
        const { data } = await api.post(url, {status})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}