import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, TeamMemberForm, TeamMember, TeamMembersSchema } from "../types";

export async function findUserByEmail({projectId, formData} : {projectId: Project["_id"], formData: TeamMemberForm}) {
    try {
        const url = `/projects/${projectId}/team/find`
        const data = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function addMemberToTeam({projectId, id} : {projectId: Project["_id"], id: TeamMember["_id"]}) {
    try {
        const url = `/projects/${projectId}/team`
        const data = await api.post(url, { id })
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteMemberFromTeam({projectId, userId} : {projectId: Project["_id"], userId: TeamMember["_id"]}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const data = await api.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectTeam(projectId: Project["_id"]) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api(url)
        const response = TeamMembersSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}