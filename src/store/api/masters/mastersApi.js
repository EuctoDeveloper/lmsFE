import { getApi, postApi, putApi } from "../api";

export const getLocationsApi = ()=>getApi(`/core/master/locations`);
export const getLocationDetailApi = (id)=>getApi(`/core/master/locations/${id}`);
export const addLocationApi = (data)=>postApi(`/core/master/locations/add`, data);
export const updateLocationApi = (id, data)=>putApi(`/core/master/locations/${id}`, data);

export const getDepartmentsApi = ()=>getApi(`/core/master/departments`);
export const getDepartmentDetailApi = (id)=>getApi(`/core/master/departments/${id}`);
export const addDepartmentApi = (data)=>postApi(`/core/master/departments/add`, data);
export const updateDepartmentApi = (id, data)=>putApi(`/core/master/departments/${id}`, data);

export const getBranchesApi = ()=>getApi(`/core/master/branches`);
export const getBranchDetailApi = (id)=>getApi(`/core/master/branches/${id}`);
export const addBranchApi = (data)=>postApi(`/core/master/branches/add`, data);
export const updateBranchApi = (id, data)=>putApi(`/core/master/branches/${id}`, data);

export const getDesignationsApi = ()=>getApi(`/core/master/designations`);
export const getDesignationDetailApi = (id)=>getApi(`/core/master/designations/${id}`);
export const addDesignationApi = (data)=>postApi(`/core/master/designations/add`, data);
export const updateDesignationApi = (id, data)=>putApi(`/core/master/designations/${id}`, data);

export const getCentresApi = ()=>getApi(`/core/master/centres`);
export const getCentreDetailApi = (id)=>getApi(`/core/master/centres/${id}`);
export const addCentreApi = (data)=>postApi(`/core/master/centres/add`, data);
export const updateCentreApi = (id, data)=>putApi(`/core/master/centres/${id}`, data);

export const getGroupsApi = ()=>getApi(`/core/master/groups`);
export const getGroupDetailApi = (id)=>getApi(`/core/master/groups/${id}`);
export const addGroupApi = (data)=>postApi(`/core/master/groups/add`, data);
export const updateGroupApi = (id, data)=>putApi(`/core/master/groups/${id}`, data);

