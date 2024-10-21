import { getApi, postApi } from "../api";

export const loginApi = (data) => postApi(`/auth/admin/login`, data);
export const getAnalyticsApi = () => getApi(`/core/analytics`);
export const forgotPasswordApi = (data) => postApi(`/auth/forgotPassword`, data);
export const resetPasswordApi = (data) => postApi(`/auth/resetPassword`, data);