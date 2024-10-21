import { call, put, takeEvery } from 'redux-saga/effects'
import * as type from '../../types';
import { getLocationDetailApi, getLocationsApi, addLocationApi, updateLocationApi, getDepartmentsApi, getDepartmentDetailApi, addDepartmentApi, updateDepartmentApi, getBranchesApi, getBranchDetailApi, addBranchApi, updateBranchApi, getDesignationsApi, getDesignationDetailApi, addDesignationApi, updateDesignationApi, getCentresApi, getCentreDetailApi, addCentreApi, updateCentreApi, getGroupsApi, getGroupDetailApi, addGroupApi, updateGroupApi } from "../../api/masters/mastersApi";



function* fetchLocationsSaga(action) {
    try {
       const data = yield call(getLocationsApi, action.payload);
       yield put({type: type.FETCH_LOCATIONS_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_LOCATIONS_FAILURE, message: e.response.data.message});
    }
}
function* fetchLocationDetailSaga(action) {
    try {
       const data = yield call(getLocationDetailApi, action.payload);
       yield put({type: type.FETCH_LOCATION_DETAIL_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_LOCATION_DETAIL_FAILURE, message: e.response.data.message});
    }
}
function* addLocationSaga(action) {
    try {
       const data = yield call(addLocationApi, action.payload);
       yield put({type: type.ADD_LOCATION_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ADD_LOCATION_FAILURE, message: e.response.data.message});
    }
}
function* updateLocationSaga(action) {
    try {
       const data = yield call(updateLocationApi, action.payload.id, action.payload.data);
       yield put({type: type.UPDATE_LOCATION_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_LOCATION_FAILURE, message: e.response.data.message});
    }
}

function* fetchDepartmentsSaga(action) {
    try {
       const data = yield call(getDepartmentsApi, action.payload);
       yield put({type: type.FETCH_DEPARTMENTS_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_DEPARTMENTS_FAILURE, message: e.response.data.message});
    }
}
function* fetchDepartmentDetailSaga(action) {
    try {
       const data = yield call(getDepartmentDetailApi, action.payload);
       yield put({type: type.FETCH_DEPARTMENT_DETAIL_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_DEPARTMENT_DETAIL_FAILURE, message: e.response.data.message});
    }
}
function* addDepartmentSaga(action) {
    try {
       const data = yield call(addDepartmentApi, action.payload);
       yield put({type: type.ADD_DEPARTMENT_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ADD_DEPARTMENT_FAILURE, message: e.response.data.message});
    }
}
function* updateDepartmentSaga(action) {
    try {
       const data = yield call(updateDepartmentApi, action.payload.id, action.payload.data);
       yield put({type: type.UPDATE_DEPARTMENT_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_DEPARTMENT_FAILURE, message: e.response.data.message});
    }
}


function* fetchBranchesSaga(action) {
    try {
       const data = yield call(getBranchesApi, action.payload);
       yield put({type: type.FETCH_BRANCHES_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_BRANCHES_FAILURE, message: e.response.data.message});
    }
}
function* fetchBranchDetailSaga(action) {
    try {
       const data = yield call(getBranchDetailApi, action.payload);
       yield put({type: type.FETCH_BRANCH_DETAIL_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_BRANCH_DETAIL_FAILURE, message: e.response.data.message});
    }
}
function* addBranchSaga(action) {
    try {
       const data = yield call(addBranchApi, action.payload);
       yield put({type: type.ADD_BRANCH_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ADD_BRANCH_FAILURE, message: e.response.data.message});
    }
}
function* updateBranchSaga(action) {
    try {
       const data = yield call(updateBranchApi, action.payload.id, action.payload.data);
       yield put({type: type.UPDATE_BRANCH_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_BRANCH_FAILURE, message: e.response.data.message});
    }
}

function* fetchDesignationsSaga(action) {
    try {
       const data = yield call(getDesignationsApi, action.payload);
       yield put({type: type.FETCH_DESIGNATIONS_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_DESIGNATIONS_FAILURE, message: e.response.data.message});
    }
}
function* fetchDesignationDetailSaga(action) {
    try {
       const data = yield call(getDesignationDetailApi, action.payload);
       yield put({type: type.FETCH_DESIGNATION_DETAIL_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_DESIGNATION_DETAIL_FAILURE, message: e.response.data.message});
    }
}
function* addDesignationSaga(action) {
    try {
       const data = yield call(addDesignationApi, action.payload);
       yield put({type: type.ADD_DESIGNATION_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ADD_DESIGNATION_FAILURE, message: e.response.data.message});
    }
}
function* updateDesignationSaga(action) {
    try {
       const data = yield call(updateDesignationApi, action.payload.id, action.payload.data);
       yield put({type: type.UPDATE_DESIGNATION_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_DESIGNATION_FAILURE, message: e.response.data.message});
    }
}

function* fetchCentresSaga(action) {
    try {
       const data = yield call(getCentresApi, action.payload);
       yield put({type: type.FETCH_CENTRES_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_CENTRES_FAILURE, message: e.response.data.message});
    }
}
function* fetchCentreDetailSaga(action) {
    try {
       const data = yield call(getCentreDetailApi, action.payload);
       yield put({type: type.FETCH_CENTRE_DETAIL_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_CENTRE_DETAIL_FAILURE, message: e.response.data.message});
    }
}
function* addCentreSaga(action) {
    try {
       const data = yield call(addCentreApi, action.payload);
       yield put({type: type.ADD_CENTRE_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ADD_CENTRE_FAILURE, message: e.response.data.message});
    }
}
function* updateCentreSaga(action) {
    try {
       const data = yield call(updateCentreApi, action.payload.id, action.payload.data);
       yield put({type: type.UPDATE_CENTRE_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_CENTRE_FAILURE, message: e.response.data.message});
    }
}

function* fetchGroupsSaga(action) {
    try {
       const data = yield call(getGroupsApi, action.payload);
       yield put({type: type.FETCH_GROUPS_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_GROUPS_FAILURE, message: e.response.data.message});
    }
}
function* fetchGroupDetailSaga(action) {
    try {
       const data = yield call(getGroupDetailApi, action.payload);
       yield put({type: type.FETCH_GROUP_DETAIL_SUCCESS, data});
    } catch (e) {
       yield put({type: type.FETCH_GROUP_DETAIL_FAILURE, message: e.response.data.message});
    }
}
function* addGroupSaga(action) {
    try {
       const data = yield call(addGroupApi, action.payload);
       yield put({type: type.ADD_GROUP_SUCCESS, data});
    } catch (e) {
       yield put({type: type.ADD_GROUP_FAILURE, message: e.response.data.message});
    }
}
function* updateGroupSaga(action) {
    try {
       const data = yield call(updateGroupApi, action.payload.id, action.payload.data);
       yield put({type: type.UPDATE_GROUP_SUCCESS, data});
    } catch (e) {
       yield put({type: type.UPDATE_GROUP_FAILURE, message: e.response.data.message});
    }
}





export function* watchFetchLocations() {
    yield takeEvery(type.FETCH_LOCATIONS, fetchLocationsSaga);
}
export function* watchFetchLocationDetail() {
    yield takeEvery(type.FETCH_LOCATION_DETAIL, fetchLocationDetailSaga);
}
export function* watchAddLocation() {
    yield takeEvery(type.ADD_LOCATION, addLocationSaga);
}
export function* watchUpdateLocation() {
    yield takeEvery(type.UPDATE_LOCATION, updateLocationSaga);
}

export function* watchFetchDepartments() {
    yield takeEvery(type.FETCH_DEPARTMENTS, fetchDepartmentsSaga);
}
export function* watchFetchDepartmentDetail() {
    yield takeEvery(type.FETCH_DEPARTMENT_DETAIL, fetchDepartmentDetailSaga);
}
export function* watchAddDepartment() {
    yield takeEvery(type.ADD_DEPARTMENT, addDepartmentSaga);
}
export function* watchUpdateDepartment() {
    yield takeEvery(type.UPDATE_DEPARTMENT, updateDepartmentSaga);
}

export function* watchFetchBranches() {
    yield takeEvery(type.FETCH_BRANCHES, fetchBranchesSaga);
}
export function* watchFetchBranchDetail() {
    yield takeEvery(type.FETCH_BRANCH_DETAIL, fetchBranchDetailSaga);
}
export function* watchAddBranch() {
    yield takeEvery(type.ADD_BRANCH, addBranchSaga);
}
export function* watchUpdateBranch() {
    yield takeEvery(type.UPDATE_BRANCH, updateBranchSaga);
}

export function* watchFetchDesignations() {
    yield takeEvery(type.FETCH_DESIGNATIONS, fetchDesignationsSaga);
}
export function* watchFetchDesignationDetail() {
    yield takeEvery(type.FETCH_DESIGNATION_DETAIL, fetchDesignationDetailSaga);
}
export function* watchAddDesignation() {
    yield takeEvery(type.ADD_DESIGNATION, addDesignationSaga);
}
export function* watchUpdateDesignation() {
    yield takeEvery(type.UPDATE_DESIGNATION, updateDesignationSaga);
}

export function* watchFetchCentres() {
    yield takeEvery(type.FETCH_CENTRES, fetchCentresSaga);
}
export function* watchFetchCentreDetail() {
    yield takeEvery(type.FETCH_CENTRE_DETAIL, fetchCentreDetailSaga);
}
export function* watchAddCentre() {
    yield takeEvery(type.ADD_CENTRE, addCentreSaga);
}
export function* watchUpdateCentre() {
    yield takeEvery(type.UPDATE_CENTRE, updateCentreSaga);
}

export function* watchFetchGroups() {
    yield takeEvery(type.FETCH_GROUPS, fetchGroupsSaga);
}
export function* watchFetchGroupDetail() {
    yield takeEvery(type.FETCH_GROUP_DETAIL, fetchGroupDetailSaga);
}
export function* watchAddGroup() {
    yield takeEvery(type.ADD_GROUP, addGroupSaga);
}
export function* watchUpdateGroup() {
    yield takeEvery(type.UPDATE_GROUP, updateGroupSaga);
}

