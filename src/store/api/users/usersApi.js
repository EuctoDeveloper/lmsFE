import { getApi, postApi, putApi } from "../api";

export const customerListApi = () => getApi(`/user/listCustomers`, true);
export const staffListApi = () => getApi(`/user/listEmployees`, true);
export const adminListApi = () => getApi(`/user/listInstructors`, true);

export const userDetailApi = (userId) => getApi(`/user/getUser/${userId}`, true);

export const createCustomerApi = (data) => postApi(`/addCustomer`, data, true);
export const createStaffApi = (data) => postApi(`/addEmployee`, data, true);
export const createAdminApi = (data) => postApi(`/addInstructor`, data, true);

export const updateCustomerApi = (userId, data) => putApi(`/user/updateCustomer/${userId}`, data, true);
export const updateStaffApi = (userId, data) => putApi(`/user/updateEmployee/${userId}`, data, true);
export const updateAdminApi = (userId, data) => putApi(`/user/updateInstructor/${userId}`, data, true);

export const deactivateUserApi = (userId) => getApi(`/user/deactivateUser/${userId}`, {}, true);
export const activateUserApi = (userId) => getApi(`/user/activateUser/${userId}`, {}, true);