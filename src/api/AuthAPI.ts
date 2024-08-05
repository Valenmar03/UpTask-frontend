import api from "../lib/axios";
import { isAxiosError } from "axios";
import {
   ConfirmToken,
   ForgotPasswordForm,
   NewPasswordForm,
   RequestConfirmationCodeForm,
   UserLoginForm,
   UserRegisterForm,
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
      console.log(token);
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
