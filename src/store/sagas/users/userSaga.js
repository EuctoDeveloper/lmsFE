import { call, put, takeEvery } from 'redux-saga/effects'
import * as type from '../../types';
import { activateUserApi, adminListApi, createAdminApi, createCustomerApi, createStaffApi, customerListApi, deactivateUserApi, staffListApi, updateAdminApi, updateCustomerApi, updateStaffApi, userDetailApi } from '../../api/users/usersApi';

function* fetchCustomerListSaga(action) {
    try {
       const data = yield call(customerListApi, action.payload);
       yield put({type: type.FETCH_CUSTOMERS_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_CUSTOMERS_FAILURE, message: e.response.data.message});
    }
}
function* fetchStaffListSaga(action) {
    try {
       const data = yield call(staffListApi, action.payload);
       yield put({type: type.FETCH_STAFFS_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_STAFFS_FAILURE, message: e.response.data.message});
    }
}
function* fetchAdminListSaga(action) {
    try {
       const data = yield call(adminListApi, action.payload);
       yield put({type: type.FETCH_ADMINS_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_ADMINS_FAILURE, message: e.response.data.message});
    }
}
function* fetchUserDetailSaga(action) {
    try {
       const data = yield call(userDetailApi, action.payload);
       yield put({type: type.FETCH_USER_DETAIL_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_USER_DETAIL_FAILURE, message: e.response.data.message});
    }
}
function* createCustomerSaga(action) {
    try {
       const data = yield call(createCustomerApi, action.payload);
       yield put({type: type.CREATE_CUSTOMER_SUCCESS, data});
    } catch (e) {
       yield put({type: type.CREATE_CUSTOMER_FAILURE, message: e.response.data.message});
    }
}
function* createStaffSaga(action) {
    try {
       const data = yield call(createStaffApi, action.payload);
       yield put({type: type.CREATE_STAFF_SUCCESS, data});
    } catch (e) {
       yield put({type: type.CREATE_STAFF_FAILURE, message: e.response.data.message});
    }
}
function* createAdminSaga(action) {
    try {
       const data = yield call(createAdminApi, action.payload);
       yield put({type: type.CREATE_ADMIN_SUCCESS, data});
    } catch (e) {
       yield put({type: type.CREATE_ADMIN_FAILURE, message: e.response.data.message});
    }
}
function* updateCustomerSaga(action) {
    try {
       const data = yield call(updateCustomerApi, action.id, action.payload);
       yield put({type: type.UPDATE_CUSTOMER_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_CUSTOMER_FAILURE, message: e.response.data.message});
    }
}
function* updateStaffSaga(action) {
    try {
       const data = yield call(updateStaffApi, action.id, action.payload);
       yield put({type: type.UPDATE_STAFF_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_STAFF_FAILURE, message: e.response.data.message});
    }
}
function* updateAdminSaga(action) {
    try {
       const data = yield call(updateAdminApi, action.id, action.payload);
       yield put({type: type.UPDATE_ADMIN_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_ADMIN_FAILURE, message: e.response.data.message});
    }
}
function* deactivateUserSaga(action) {
    try {
         const data = yield call(deactivateUserApi, action.payload);
            yield put({type: type.DEACTIVATE_USER_SUCCESS, data});
    } catch (e) {
         yield put({type: type.DEACTIVATE_USER_FAILURE, message: e.response.data.message});
    }
}
function* activateUserSaga(action) {
    try {
        const data = yield call(activateUserApi, action.payload);
        yield put({type: type.ACTIVATE_USER_SUCCESS, data});
    } catch (e) {
        yield put({type: type.ACTIVATE_USER_FAILURE, message: e.response.data.message});
    }
}

export function* watchFetchCustomerListSaga() {
    yield takeEvery(type.FETCH_CUSTOMERS, fetchCustomerListSaga);
}
export function* watchFetchStaffListSaga() {
    yield takeEvery(type.FETCH_STAFFS, fetchStaffListSaga);
}
export function* watchFetchAdminListSaga() {
    yield takeEvery(type.FETCH_ADMINS, fetchAdminListSaga);
}
export function* watchFetchUserDetailSaga() {
    yield takeEvery(type.FETCH_USER_DETAIL, fetchUserDetailSaga);
}
export function* watchCreateCustomerSaga() {
    yield takeEvery(type.CREATE_CUSTOMER, createCustomerSaga);
}
export function* watchCreateStaffSaga() {
    yield takeEvery(type.CREATE_STAFF, createStaffSaga);
}
export function* watchCreateAdminSaga() {
    yield takeEvery(type.CREATE_ADMIN, createAdminSaga);
}
export function* watchUpdateCustomerSaga() {
    yield takeEvery(type.UPDATE_CUSTOMER, updateCustomerSaga);
}
export function* watchUpdateStaffSaga() {
    yield takeEvery(type.UPDATE_STAFF, updateStaffSaga);
}
export function* watchUpdateAdminSaga() {
    yield takeEvery(type.UPDATE_ADMIN, updateAdminSaga);
}
export function* watchDeactivateUserSaga() {
    yield takeEvery(type.DEACTIVATE_USER, deactivateUserSaga);
}
export function* watchActivateUserSaga() {
    yield takeEvery(type.ACTIVATE_USER, activateUserSaga);
}
