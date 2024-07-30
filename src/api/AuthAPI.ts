import api from "../lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, RequestConfirmationCodeForm, UserRegisterForm } from "../types";

export async function createAccount(formData: UserRegisterForm){
    try {
        const url = '/auth/create-account'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(token: ConfirmToken){
    try {
        const url = '/auth/confirm-account'
        console.log(token)
        const { data } = await api.post<string>(url, token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestConfirmationCode(email: RequestConfirmationCodeForm){
    try {
        const url = '/auth/request-new-code'
        const { data } = await api.post<string>(url, email)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}