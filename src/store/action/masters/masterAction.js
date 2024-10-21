import * as type from '../../types';

export function getLocationsAction() {
    return {
        type: type.FETCH_LOCATIONS
    }
}
export function getLocationAction(data) {
    return {
        type: type.FETCH_LOCATION_DETAIL,
        payload: data
    }
}
export function updateLocationAction(id, data) {
    return {
        type: type.UPDATE_LOCATION,
        payload: {id, data}
    }
}
export function addLocationAction(data) {
    return {
        type: type.ADD_LOCATION,
        payload: data
    }
}

export function getDepartmentsAction() {
    return {
        type: type.FETCH_DEPARTMENTS
    }
}
export function getDepartmentAction(data) {
    return {
        type: type.FETCH_DEPARTMENT_DETAIL,
        payload: data
    }
}
export function updateDepartmentAction(id, data) {
    return {
        type: type.UPDATE_DEPARTMENT,
        payload: {id, data}
    }
}
export function addDepartmentAction(data) {
    return {
        type: type.ADD_DEPARTMENT,
        payload: data
    }
}

export function getBranchesAction() {
    return {
        type: type.FETCH_BRANCHES
    }
}
export function getBranchAction(data) {
    return {
        type: type.FETCH_BRANCH_DETAIL,
        payload: data
    }
}
export function updateBranchAction(id, data) {
    return {
        type: type.UPDATE_BRANCH,
        payload: {id, data}
    }
}
export function addBranchAction(data) {
    return {
        type: type.ADD_BRANCH,
        payload: data
    }
}

export function getDesignationsAction() {
    return {
        type: type.FETCH_DESIGNATIONS
    }
}
export function getDesignationAction(data) {
    return {
        type: type.FETCH_DESIGNATION_DETAIL,
        payload: data
    }
}
export function updateDesignationAction(id, data) {
    return {
        type: type.UPDATE_DESIGNATION,
        payload: {id, data}
    }
}
export function addDesignationAction(data) {
    return {
        type: type.ADD_DESIGNATION,
        payload: data
    }
}

export function getCentersAction() {
    return {
        type: type.FETCH_CENTRES
    }
}
export function getCenterAction(data) {
    return {
        type: type.FETCH_CENTRE_DETAIL,
        payload: data
    }
}
export function updateCenterAction(id, data) {
    return {
        type: type.UPDATE_CENTRE,
        payload: {id, data}
    }
}
export function addCenterAction(data) {
    return {
        type: type.ADD_CENTRE,
        payload: data
    }
}

export function getGroupsAction() {
    return {
        type: type.FETCH_GROUPS
    }
}
export function getGroupAction(data) {
    return {
        type: type.FETCH_GROUP_DETAIL,
        payload: data
    }
}
export function updateGroupAction(id, data) {
    return {
        type: type.UPDATE_GROUP,
        payload: {id, data}
    }
}
export function addGroupAction(data) {
    return {
        type: type.ADD_GROUP,
        payload: data
    }
}