import { isAxiosError } from "axios"
import api from "../lib/axios"
import { updatePasswordForm, UserProfileForm } from "../types"


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

export async function updateLoguedUserPassword(formData: updatePasswordForm) {
    try {
        const { data } = await api.post('/auth/profile/update-password', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}