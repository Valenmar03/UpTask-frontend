import api from "../lib/axios";
import { isAxiosError } from "axios";
import { UserRegisterForm } from "../types";

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