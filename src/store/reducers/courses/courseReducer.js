import { closeLoader, openLoader } from '../../../utils/Loader';
import OpenNotification from '../../../utils/OpenNotification';
import * as type from '../../types';

const initialCoursesState = {
    response: {},
    loading: false,
    error: null
}
const initialCourseDetailState = {
    response: {},
    loading: false,
    error: null
}
const initialAddCourseState = {
    response: {},
    loading: false,
    error: null
}
const initialUpdateCourseState = {
    response: {},
    loading: false,
    error: null
}
const initialDeactivateCourseState = {
    response: {},
    loading: false,
    error: null
}
const initialActivateCourseState = {
    response: {},
    loading: false,
    error: null
}
const initialModuleListState = {
    response: {},
    loading: false,
    error: null
}
const initialAddModuleState = {
    response: {},
    loading: false,
    error: null
}
const initialUpdateModuleState = {
    response: {},
    loading: false,
    error: null
}
const initialDeactivateateModuleState = {
    response: {},
    loading: false,
    error: null
}
const initialActivateModuleState = {
    response: {},
    loading: false,
    error: null
}
const initialLessonDetailState = {
    response: {},
    loading: false,
    error: null
}
const initialLessonUpdateState = {
    response: {},
    loading: false,
    error: null
}
const initialAddLessonState = {
    response: {},
    loading: false,
    error: null
}
const initialDeactivateateLessonState = {
    response: {},
    loading: false,
    error: null
}
const initialActivateLessonState = {
    response: {},
    loading: false,
    error: null
}
const initialAddCourseCriteriaState = {
    response: {},
    loading: false,
    error: null
}
const initialFetchCourseProgressListByUserIdState = {
    response: {},
    loading: false,
    error: null
}
const initialFetchUserProgressListByCourseIdState = {
    response: {},
    loading: false,
    error: null
}
const initialFetchCourseProgressDetailState = {
    response: {},
    loading: false,
    error: null
}

export function courseListReducer(state = initialCoursesState, action) {
    switch (action.type) {
        case type.FETCH_COURSES:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_COURSES_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.courses
            }
        case type.FETCH_COURSES_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function courseDetailReducer(state = initialCourseDetailState, action) {
    switch (action.type) {
        case type.FETCH_COURSE_DETAIL:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_COURSE_DETAIL_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.course
            }
        case type.FETCH_COURSE_DETAIL_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        case type.CLEAR_COURSE_DETAIL:
            return {
                ...state,
                loading: true,
                response: {}
            }
        default:
            return state
    }
}
export function addCourseReducer(state = initialAddCourseState, action) {
    switch (action.type) {
        case type.ADD_COURSE:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ADD_COURSE_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ADD_COURSE_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function updateCourseReducer(state = initialUpdateCourseState, action) {
    switch (action.type) {
        case type.UPDATE_COURSE:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_COURSE_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.UPDATE_COURSE_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function deactivateCourseReducer(state = initialDeactivateCourseState, action) {
    switch (action.type) {
        case type.DEACTIVATE_COURSE:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.DEACTIVATE_COURSE_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.DEACTIVATE_COURSE_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function activateCourseReducer(state = initialActivateCourseState, action) {
    switch (action.type) {
        case type.ACTIVATE_COURSE:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ACTIVATE_COURSE_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ACTIVATE_COURSE_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}


export function modulesListReducer(state = initialModuleListState, action) {
    switch (action.type) {
        case type.FETCH_MODULES:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_MODULES_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.modules
            }
        case type.FETCH_MODULES_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        case type.FETCH_MODULES_RESET:
            return {
                ...state,
                loading: false,
                response: {}
            }
        default:
            return state
    }
}
export function addModuleReducer(state = initialAddModuleState, action) {
    switch (action.type) {
        case type.ADD_MODULE:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ADD_MODULE_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ADD_MODULE_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function updateModuleReducer(state = initialUpdateModuleState, action) {
    switch (action.type) {
        case type.UPDATE_MODULE:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_MODULE_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.UPDATE_MODULE_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function deactivateModuleReducer(state = initialDeactivateateModuleState, action) {
    switch (action.type) {
        case type.DEACTIVATE_MODULE:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.DEACTIVATE_MODULE_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.DEACTIVATE_MODULE_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function activateModuleReducer(state = initialActivateModuleState, action) {
    switch (action.type) {
        case type.ACTIVATE_MODULE:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ACTIVATE_MODULE_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ACTIVATE_MODULE_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}


export function lessonDetailReducer(state = initialLessonDetailState, action) {
    switch (action.type) {
        case type.FETCH_LESSON:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_LESSON_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.lesson
            }
        case type.FETCH_LESSON_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function lessonUpdateReducer(state = initialLessonUpdateState, action) {
    switch (action.type) {
        case type.UPDATE_LESSON:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_LESSON_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.UPDATE_LESSON_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function addLessonReducer(state = initialAddLessonState, action) {
    switch (action.type) {
        case type.ADD_LESSON:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ADD_LESSON_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ADD_LESSON_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function deactivateLessonReducer(state = initialDeactivateateLessonState, action) {
    switch (action.type) {
        case type.DEACTIVATE_LESSON:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.DEACTIVATE_LESSON_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.DEACTIVATE_LESSON_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}
export function activateLessonReducer(state = initialActivateLessonState, action) {
    switch (action.type) {
        case type.ACTIVATE_LESSON:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ACTIVATE_LESSON_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ACTIVATE_LESSON_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}

export function addCourseCriteriaReducer(state = initialAddCourseCriteriaState, action) {
    switch (action.type) {
        case type.ADD_COURSE_CRITERIA:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ADD_COURSE_CRITERIA_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ADD_COURSE_CRITERIA_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}

export function fetchCourseProgressListByUserIdReducer(state = initialFetchCourseProgressListByUserIdState, action) {
    switch (action.type) {
        case type.FETCH_COURSE_PROGRESS_LIST_BY_USER_ID:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_COURSE_PROGRESS_LIST_BY_USER_ID_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.FETCH_COURSE_PROGRESS_LIST_BY_USER_ID_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}

export function fetchUserProgressListByCourseIdReducer(state = initialFetchUserProgressListByCourseIdState, action) {
    switch (action.type) {
        case type.FETCH_USER_PROGRESS_LIST_BY_COURSE_ID:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_USER_PROGRESS_LIST_BY_COURSE_ID_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.FETCH_USER_PROGRESS_LIST_BY_COURSE_ID_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}

export function fetchCourseProgressDetailReducer(state = initialFetchCourseProgressDetailState, action) {
    switch (action.type) {
        case type.FETCH_COURSE_PROGRESS_DETAIL:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_COURSE_PROGRESS_DETAIL_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.FETCH_COURSE_PROGRESS_DETAIL_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}