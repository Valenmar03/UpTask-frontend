import api from "../lib/axios";
import { isAxiosError } from "axios";
import {
   checkPasswordForm,
   ConfirmToken,
   ForgotPasswordForm,
   NewPasswordForm,
   RequestConfirmationCodeForm,
   UserLoginForm,
   UserRegisterForm,
   userSchema,
   ValidateToken,
} from "../types";

export async function createAccount(formData: UserRegisterForm) {
   try {
      const url = "/auth/create-account";
      const { data } = await api.post<string>(url, formData);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
}

export async function confirmAccount(token: ConfirmToken) {
   try {
      const url = "/auth/confirm-account";
      const { data } = await api.post<string>(url, token);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
}

export async function requestConfirmationCode(
   email: RequestConfirmationCodeForm
) {
   try {
      const url = "/auth/request-new-code";
      const { data } = await api.post<string>(url, email);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
}

export async function logIn(logInData: UserLoginForm) {
   try {
      const url = "/auth/login";
      const { data } = await api.post<string>(url, logInData);

      localStorage.setItem('AUTH_TOKEN', data)
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
}

export async function forgotPassword(email: ForgotPasswordForm) {
   try {
      const url = "/auth/forgot-password";
      const { data } = await api.post<string>(url, email);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
}

export async function validateToken(token: ValidateToken) {
   try {
      const url = "/auth/validate-token";
      const { data } = await api.post<string>(url, token);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
}

export async function updatePassword({password,token,}: {password: NewPasswordForm; token: ValidateToken["token"];}) {
   try {
      const url = `/auth/update-password/${token}`;
      const { data } = await api.post<string>(url, password);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
}

export async function getUserAuthenticated(){
   try {
      const { data } = await api('/auth/user')
      const response = userSchema.safeParse(data)
      if(response.success){
         return response.data
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
}

export async function checkPassword(formData: checkPasswordForm){
   try {
      const url = '/auth/check-password'
      const { data } = await api.post(url, formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error);
      }
   }
}