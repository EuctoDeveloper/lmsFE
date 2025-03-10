import { call, put, takeEvery } from 'redux-saga/effects'
import * as type from '../../types';
import { createWebinarApi, disableWebinarApi , getBookedDatesApi, getWebinarDetailsApi, getWebinarsApi, updateWebinarApi } from '../../api/webinars/webinarApi';

function* createWebinarSaga(action) {
    try {
       const data = yield call(createWebinarApi, action.payload);
       yield put({type: type.CREATE_WEBINAR_SUCCESS, data});
    } catch (e) {
       yield put({type: type.CREATE_WEBINAR_FAILURE, message: e.response.data.message});
    }
}

function* fetchWebinarsSaga(action) {
    try {
       const data = yield call(getWebinarsApi);
       yield put({type: type.FETCH_WEBINARS_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_WEBINARS_FAILURE, message: e.response.data.message});
    }
}

function* fetchWebinarDetailsSaga(action) {
    try {
       const data = yield call(getWebinarDetailsApi, action.payload);
       yield put({type: type.FETCH_WEBINAR_DETAIL_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_WEBINAR_DETAIL_FAILURE, message: e.response.data.message});
    }
}

function* updateWebinarSaga(action) {
    try {
        console.log(action.payload);
       const data = yield call(updateWebinarApi, action.payload.data, action.payload.id);
       yield put({type: type.UPDATE_WEBINAR_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_WEBINAR_FAILURE, message: e.response.data.message});
    }
}

function* disableWebinarSaga(action) {
    try {
       const data = yield call(disableWebinarApi, action.payload);
       yield put({type: type.DISABLE_WEBINAR_SUCCESS, data});
    } catch (e) {
       yield put({type: type.DISABLE_WEBINAR_FAILURE, message: e.response.data.message});
    }
}

function* fetchBookedDatesSaga(action) {
    try {
       const data = yield call(getBookedDatesApi, action.payload);
       yield put({type: type.FETCH_BOOKED_DATES_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_BOOKED_DATES_FAILURE, message: e.response.data.message});
    }
}

export function* watchCreateWebinar() {
    yield takeEvery(type.CREATE_WEBINAR, createWebinarSaga);
}
export function* watchFetchWebinars() {
    yield takeEvery(type.FETCH_WEBINARS, fetchWebinarsSaga);
}
export function* watchFetchWebinarDetails() {
    yield takeEvery(type.FETCH_WEBINAR_DETAIL, fetchWebinarDetailsSaga);
}
export function* watchUpdateWebinar() {
    yield takeEvery(type.UPDATE_WEBINAR, updateWebinarSaga);
}
export function* watchDeleteWebinar() {
    yield takeEvery(type.DISABLE_WEBINAR, disableWebinarSaga);
}
export function* watchFetchBookedDatesSaga() {
    yield takeEvery(type.FETCH_BOOKED_DATES, fetchBookedDatesSaga);
}