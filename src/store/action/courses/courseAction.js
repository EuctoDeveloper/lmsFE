import * as type from '../../types';

export function getCourses(data) {
    return {
        type: type.FETCH_COURSES,
        payload: data
    }
}
export function getCourse(data) {
    return {
        type: type.FETCH_COURSE_DETAIL,
        payload: data
    }
}
export function clearCourse() {
    return {
        type: type.CLEAR_COURSE_DETAIL,
    }
}
export function updateCourse(id, data) {
    return {
        type: type.UPDATE_COURSE,
        payload: {id, data}
    }
}
export function addCourse(data) {
    return {
        type: type.ADD_COURSE,
        payload: data
    }
}
export function deactivateCourseAction(id) {
    return {
        type: type.DEACTIVATE_COURSE,
        payload: id
    }
}
export function activateCourseAction(id) {
    return {
        type: type.ACTIVATE_COURSE,
        payload: id
    }
}

export function getModules(data) {
    return {
        type: type.FETCH_MODULES,
        payload: data
    }
}
export function updateModule(id, data) {
    return {
        type: type.UPDATE_MODULE,
        payload: {id, data}
    }
}
export function addModule(data) {
    return {
        type: type.ADD_MODULE,
        payload: data
    }
}
export function deactivateModuleAction(data) {
    return {
        type: type.DEACTIVATE_MODULE,
        payload: data
    }
}
export function activateModuleAction(data) {
    return {
        type: type.ACTIVATE_MODULE,
        payload: data
    }
}
export function resetModule() {
    return {
        type: type.FETCH_MODULES_RESET,
    }
}

export function getLesson(data) {
    return {
        type: type.FETCH_LESSON,
        payload: data
    }
}
export function updateLesson(id, data) {
    return {
        type: type.UPDATE_LESSON,
        payload: {id, data}
    }
}
export function addLesson(data) {
    return {
        type: type.ADD_LESSON,
        payload: data
    }
}
export function deactivateLessonAction(data) {
    return {
        type: type.DEACTIVATE_LESSON,
        payload: data
    }
}
export function activateLessonAction(data) {
    return {
        type: type.ACTIVATE_LESSON,
        payload: data
    }
}
export function addCourseCriteria(data) {
    return {
        type: type.ADD_COURSE_CRITERIA,
        payload: data
    }
}