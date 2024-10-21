import { call, put, takeEvery } from 'redux-saga/effects'
import * as type from '../../types';
import { forgotPasswordApi, getAnalyticsApi, loginApi, resetPasswordApi } from '../../api/common/authApi';

function* fetchLoginSaga(action) {
    try {
       const data = yield call(loginApi, action.payload);
       yield put({type: type.FETCH_LOGIN_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_LOGIN_FAILURE, message: e.response.data.message});
    }
}
function* fetchAnalyticsSaga(action) {
    try {
        const data = yield call(getAnalyticsApi, action.payload);
        yield put({type: type.FETCH_ANALYTICS_SUCCESS, data});
    } catch (e) {
        yield put({type: type.FETCH_ANALYTICS_FAILURE, message: e.response.data.message});
    }
}
function* forgotPasswordSaga(action) {
    try {
        const data = yield call(forgotPasswordApi, action.payload);
        yield put({type: type.FORGOT_PASSWORD_SUCCESS, data});
    } catch (e) {
        yield put({type: type.FORGOT_PASSWORD_FAILURE, message: e.response.data.message});
    }
}
function* resetPasswordSaga(action) {
    try {
        const data = yield call(resetPasswordApi, action.payload);
        yield put({type: type.RESET_PASSWORD_SUCCESS, data});
    } catch (e) {
        yield put({type: type.RESET_PASSWORD_FAILURE, message: e.response.data.message});
    }
}
 


export function* watchFetchLoginSaga() {
    yield takeEvery(type.FETCH_LOGIN, fetchLoginSaga);
}
export function* watchFetchAnalyticsSaga() {
    yield takeEvery(type.FETCH_ANALYTICS, fetchAnalyticsSaga);
}
export function* watchForgotPasswordSaga() {
    yield takeEvery(type.FORGOT_PASSWORD, forgotPasswordSaga);
}
export function* watchResetPasswordSaga() {
    yield takeEvery(type.RESET_PASSWORD, resetPasswordSaga);
}