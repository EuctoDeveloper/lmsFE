import { getApi, postApi } from "../api";

export const createWebinarApi = (data) => postApi(`/core/webinar/create`, data, false);
export const getWebinarsApi = () => getApi(`/core/webinar/list`, false);
export const getWebinarDetailsApi = (id) => getApi(`/core/webinar/${id}`, false);
export const updateWebinarApi = (data, id) => postApi(`/core/webinar/update/${id}`, data, false);
export const disableWebinarApi = (data) => getApi(`/core/webinar/disable/${data}`, false);
export const getBookedDatesApi = (date) => getApi(`/core/webinar/booked-dates?date=${date}`, false);