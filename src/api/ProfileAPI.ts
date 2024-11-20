import { isAxiosError } from "axios"
import api from "../lib/axios"
import { UserProfileForm } from "../types"


export async function updateProfile(formData: UserProfileForm) {
    try {
        const { data } = await api.put('/auth/profile', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}