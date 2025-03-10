import { getApi, postApi, putApi } from "../api";

export const getCoursesApi = ()=>getApi(`/core/courses`);
export const getCourseDetailApi = (id)=>getApi(`/core/courses/${id}`);
export const addCourseApi = (data)=>postApi(`/core/courses/add`, data);
export const updateCourseApi = (id, data)=>putApi(`/core/courses/${id}`, data);
export const deactivateCourseApi = (id)=>getApi(`/core/courses/deactivate/${id}`);
export const activateCourseApi = (id)=>getApi(`/core/courses/activate/${id}`);

export const getModulesAPi = (id)=>getApi(`/core/modules/${id}`);
export const addModuleApi = (data)=>postApi(`/core/modules/add`, data);
export const updateModulespApi = (id, data)=>putApi(`/core/modules/${id}`, data);
export const deactivateModuleApi = (id)=>getApi(`/core/modules/deactivate/${id}`);
export const activateModuleApi = (id)=>getApi(`/core/modules/activate/${id}`);

export const getLessonApi = (id)=>getApi(`/core/lessons/${id}`);
export const updateLessonApi = (id, data)=>putApi(`/core/lessons/${id}`, data);
export const addLessonApi = (data)=>postApi(`/core/lessons`, data);
export const deactivateLessonApi = (id)=>getApi(`/core/lessons/deactivate/${id}`);
export const activateLessonApi = (id)=>getApi(`/core/lessons/activate/${id}`);

export const addCourseCriteriaApi = (data)=>postApi(`/core/courses/addCriteria`, data);

export const getCourseProgressListByUserIdApi = (userId)=>getApi(`/stream/admin/courses/${userId}`);
export const getUserProgressListByCourseIdApi = (courseId)=>getApi(`/stream/admin/users/${courseId}`);
export const getCourseProgressDetailApi = (courseId, userId)=>getApi(`/stream/admin/progress/${courseId}/${userId}`);

export const saveActivityApi = (data)=>postApi(`/core/lessons/activity`, data);
export const getLessonActivityApi = (lessonId)=>getApi(`/core/lessons/activity/${lessonId}`);