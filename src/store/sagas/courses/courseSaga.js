import { call, put, takeEvery } from 'redux-saga/effects'
import * as type from '../../types';
import { activateCourseApi, activateLessonApi, activateModuleApi, addCourseApi, addCourseCriteriaApi, addLessonApi, addModuleApi, deactivateCourseApi, deactivateLessonApi, deactivateModuleApi, getCourseDetailApi, getCourseProgressDetailApi, getCourseProgressListByUserIdApi, getCoursesApi, getLessonApi, getModulesAPi, getUserProgressListByCourseIdApi, updateCourseApi, updateLessonApi, updateModulespApi } from '../../api/courses/courseApi';

function* fetchCoursesSaga(action) {
    try {
       const data = yield call(getCoursesApi, action.payload);
       yield put({type: type.FETCH_COURSES_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_COURSES_FAILURE, message: e.response.data.message});
    }
}
function* fetchCourseDetailSaga(action) {
    try {
       const data = yield call(getCourseDetailApi, action.payload);
       yield put({type: type.FETCH_COURSE_DETAIL_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_COURSE_DETAIL_FAILURE, message: e.response.data.message});
    }
}
function* addCourseSaga(action) {
    try {
       const data = yield call(addCourseApi, action.payload);
       yield put({type: type.ADD_COURSE_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ADD_COURSE_FAILURE, message: e.response.data.message});
    }
}
function* updateCourseSaga(action) {
    try {
       const data = yield call(updateCourseApi, action.payload.id, action.payload.data);
       yield put({type: type.UPDATE_COURSE_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_COURSE_FAILURE, message: e.response.data.message});
    }
}
function* deactivateCourseSaga(action) {
    try {
         const data = yield call(deactivateCourseApi, action.payload);
            yield put({type: type.DEACTIVATE_COURSE_SUCCESS, data});
    } catch (e) {
         yield put({type: type.DEACTIVATE_COURSE_FAILURE, message: e.response.data.message});
    }
}
function* activateCourseSaga(action) {
    try {
        const data = yield call(activateCourseApi, action.payload);
        yield put({type: type.ACTIVATE_COURSE_SUCCESS, data});
    } catch (e) {
        yield put({type: type.ACTIVATE_COURSE_FAILURE, message: e.response.data.message});
    }
}
function* fetchModulesListSaga(action) {
    try {
       const data = yield call(getModulesAPi, action.payload);
       yield put({type: type.FETCH_MODULES_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_MODULES_FAILURE, message: e.response.data.message});
    }
}
function* addModuleSaga(action) {
    try {
       const data = yield call(addModuleApi, action.payload);
       yield put({type: type.ADD_MODULE_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ADD_MODULE_FAILURE, message: e.response.data.message});
    }
}
function* updateModuleSaga(action) {
    try {
       const data = yield call(updateModulespApi, action.payload.id, action.payload.data);
       yield put({type: type.UPDATE_MODULE_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_MODULE_FAILURE, message: e.response.data.message});
    }
}
function* deactivateModuleSaga(action) {
    try {
       const data = yield call(deactivateModuleApi, action.payload);
       yield put({type: type.DEACTIVATE_MODULE_SUCCESS, data});
    } catch (e) {
       yield put({type: type.DEACTIVATE_MODULE_FAILURE, message: e.response.data.message});
    }
}
function* activateModuleSaga(action) {
    try {
       const data = yield call(activateModuleApi, action.payload);
       yield put({type: type.ACTIVATE_MODULE_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ACTIVATE_MODULE_FAILURE, message: e.response.data.message});
    }
}
function* fetchLessonDetailSaga(action) {
    try {
       const data = yield call(getLessonApi, action.payload);
       yield put({type: type.FETCH_LESSON_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_LESSON_FAILURE, message: e.response.data.message});
    }
}
function* updateLessonSaga(action) {
    try {
       const data = yield call(updateLessonApi, action.payload.id, action.payload.data);
       yield put({type: type.UPDATE_LESSON_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_LESSON_FAILURE, message: e.response.data.message});
    }
}
function* addLessonSaga(action) {
    try {
       const data = yield call(addLessonApi, action.payload);
       yield put({type: type.ADD_LESSON_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ADD_LESSON_FAILURE, message: e.response.data.message});
    }
}
function* deactivateLessonSaga(action) {
    try {
       const data = yield call(deactivateLessonApi, action.payload);
       yield put({type: type.DEACTIVATE_LESSON_SUCCESS, data});
    } catch (e) {
       yield put({type: type.DEACTIVATE_LESSON_FAILURE, message: e.response.data.message});
    }
}
function* activateLessonSaga(action) {
    try {
       const data = yield call(activateLessonApi, action.payload);
       yield put({type: type.ACTIVATE_LESSON_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ACTIVATE_LESSON_FAILURE, message: e.response.data.message});
    }
}
function* addCourseCriteriaSaga(action) {
    try {
       const data = yield call(addCourseCriteriaApi, action.payload);
       yield put({type: type.ADD_COURSE_CRITERIA_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ADD_COURSE_CRITERIA_FAILURE, message: e.response.data.message});
    }
}
function* fetchCourseProgressListByUserIdSaga(action) {
    try {
       const data = yield call(getCourseProgressListByUserIdApi, action.payload);
       yield put({type: type.FETCH_COURSE_PROGRESS_LIST_BY_USER_ID_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_COURSE_PROGRESS_LIST_BY_USER_ID_FAILURE, message: e.response.data.message});
    }
}
function* fetchUserProgressListByCourseIdSaga(action) {
    try {
       const data = yield call(getUserProgressListByCourseIdApi, action.payload);
       yield put({type: type.FETCH_USER_PROGRESS_LIST_BY_COURSE_ID_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_USER_PROGRESS_LIST_BY_COURSE_ID_FAILURE, message: e.response.data.message});
    }
}
function* fetchCourseProgressDetailSaga(action) {
    try {
       const data = yield call(getCourseProgressDetailApi, action.payload.courseId, action.payload.userId);
       yield put({type: type.FETCH_COURSE_PROGRESS_DETAIL_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_COURSE_PROGRESS_DETAIL_FAILURE, message: e.response.data.message});
    }
}
 


export function* watchFetchCoursesSaga() {
    yield takeEvery(type.FETCH_COURSES, fetchCoursesSaga);
}
export function* watchFetchCourseDetailSaga() {
    yield takeEvery(type.FETCH_COURSE_DETAIL, fetchCourseDetailSaga);
}
export function* watchAddCourseSaga() {
    yield takeEvery(type.ADD_COURSE, addCourseSaga);
}
export function* watchUpdateCourseSaga() {
    yield takeEvery(type.UPDATE_COURSE, updateCourseSaga);
}
export function* watchFetchModulesListSaga() {
    yield takeEvery(type.FETCH_MODULES, fetchModulesListSaga);
}
export function* watchAddModuleSaga() {
    yield takeEvery(type.ADD_MODULE, addModuleSaga);
}
export function* watchUpdateModuleSaga() {
    yield takeEvery(type.UPDATE_MODULE, updateModuleSaga);
}
export function* watchDeactivateModuleSaga() {
    yield takeEvery(type.DEACTIVATE_MODULE, deactivateModuleSaga);
}
export function* watchActivateModuleSaga() {
    yield takeEvery(type.ACTIVATE_MODULE, activateModuleSaga);
}
export function* watchFetchLessonDetailSaga() {
    yield takeEvery(type.FETCH_LESSON, fetchLessonDetailSaga);
}
export function* watchUpdateLessonSaga() {
    yield takeEvery(type.UPDATE_LESSON, updateLessonSaga);
}
export function* watchAddLessonSaga() {
    yield takeEvery(type.ADD_LESSON, addLessonSaga);
}
export function* watchDeactivateLessonSaga() {
    yield takeEvery(type.DEACTIVATE_LESSON, deactivateLessonSaga);
}
export function* watchActivateLessonSaga() {
    yield takeEvery(type.ACTIVATE_LESSON, activateLessonSaga);
}
export function* watchAddCourseCriteriaSaga() {
    yield takeEvery(type.ADD_COURSE_CRITERIA, addCourseCriteriaSaga);
}
export function* watchDeactivateCourseSaga() {
    yield takeEvery(type.DEACTIVATE_COURSE, deactivateCourseSaga);
}
export function* watchActivateCourseSaga() {
    yield takeEvery(type.ACTIVATE_COURSE, activateCourseSaga);
}
export function* watchFetchCourseProgressListByUserIdSaga() {
    yield takeEvery(type.FETCH_COURSE_PROGRESS_LIST_BY_USER_ID, fetchCourseProgressListByUserIdSaga);
}
export function* watchFetchUserProgressListByCourseIdSaga() {
    yield takeEvery(type.FETCH_USER_PROGRESS_LIST_BY_COURSE_ID, fetchUserProgressListByCourseIdSaga);
}
export function* watchFetchCourseProgressDetailSaga() {
    yield takeEvery(type.FETCH_COURSE_PROGRESS_DETAIL, fetchCourseProgressDetailSaga);
}