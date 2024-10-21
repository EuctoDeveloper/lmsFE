import { closeLoader, openLoader } from '../../../utils/Loader';
import OpenNotification from '../../../utils/OpenNotification';
import * as type from '../../types';

const initialFetchLocationsState = {
    response: {},
    loading: false,
    error: null
}
const initialFetchLocationState = {
    response: {},
    loading: false,
    error: null
}
const initialUpdateLocationState = {
    response: {},
    loading: false,
    error: null
}
const initialAddLocationState = {
    response: {},
    loading: false,
    error: null
}


const initialFetchDepartmentsState = {
    response: {},
    loading: false,
    error: null
}
const initialFetchDepartmentState = {
    response: {},
    loading: false,
    error: null
}
const initialUpdateDepartmentState = {
    response: {},
    loading: false,
    error: null
}
const initialAddDepartmentState = {
    response: {},
    loading: false,
    error: null
}


const initialFetchBranchesState = {
    response: {},
    loading: false,
    error: null
}
const initialFetchBranchState = {
    response: {},
    loading: false,
    error: null
}
const initialUpdateBranchState = {
    response: {},
    loading: false,
    error: null
}
const initialAddBranchState = {
    response: {},
    loading: false,
    error: null
}


const initialFetchDesignationsState = {
    response: {},
    loading: false,
    error: null
}
const initialFetchDesignationState = {
    response: {},
    loading: false,
    error: null
}
const initialUpdateDesignationState = {
    response: {},
    loading: false,
    error: null
}
const initialAddDesignationState = {
    response: {},
    loading: false,
    error: null
}


const initialFetchGroupsState = {
    response: {},
    loading: false,
    error: null
}
const initialFetchGroupState = {
    response: {},
    loading: false,
    error: null
}
const initialUpdateGroupState = {
    response: {},
    loading: false,
    error: null
}
const initialAddGroupState = {
    response: {},
    loading: false,
    error: null
}


const initialFetchCentresState = {
    response: {},
    loading: false,
    error: null
}
const initialFetchCentreState = {
    response: {},
    loading: false,
    error: null
}
const initialUpdateCentreState = {
    response: {},
    loading: false,
    error: null
}
const initialAddCentreState = {
    response: {},
    loading: false,
    error: null
}

export function fetchLocationsReducer (state = initialFetchLocationsState, action) {
    switch (action.type) {
        case type.FETCH_LOCATIONS:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_LOCATIONS_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.locations
            }
        case type.FETCH_LOCATIONS_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function fetchLocationReducer (state = initialFetchLocationState, action) {
    switch (action.type) {
        case type.FETCH_LOCATION_DETAIL:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_LOCATION_DETAIL_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.location
            }
        case type.FETCH_LOCATION_DETAIL_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function updateLocationReducer (state = initialUpdateLocationState, action) {
    switch (action.type) {
        case type.UPDATE_LOCATION:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_LOCATION_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.UPDATE_LOCATION_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function addLocationReducer (state = initialAddLocationState, action) {
    switch (action.type) {
        case type.ADD_LOCATION:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ADD_LOCATION_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ADD_LOCATION_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}


export function fetchDepartmentsReducer (state = initialFetchDepartmentsState, action) {
    switch (action.type) {
        case type.FETCH_DEPARTMENTS:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_DEPARTMENTS_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.departments
            }
        case type.FETCH_DEPARTMENTS_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function fetchDepartmentReducer (state = initialFetchDepartmentState, action) {
    switch (action.type) {
        case type.FETCH_DEPARTMENT_DETAIL:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_DEPARTMENT_DETAIL_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.department
            }
        case type.FETCH_DEPARTMENT_DETAIL_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function updateDepartmentReducer (state = initialUpdateDepartmentState, action) {
    switch (action.type) {
        case type.UPDATE_DEPARTMENT:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_DEPARTMENT_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.UPDATE_DEPARTMENT_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function addDepartmentReducer (state = initialAddDepartmentState, action) {
    switch (action.type) {
        case type.ADD_DEPARTMENT:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ADD_DEPARTMENT_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ADD_DEPARTMENT_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}


export function fetchBranchesReducer (state = initialFetchBranchesState, action) {
    switch (action.type) {
        case type.FETCH_BRANCHES:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_BRANCHES_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.branches
            }
        case type.FETCH_BRANCHES_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function fetchBranchReducer (state = initialFetchBranchState, action) {
    switch (action.type) {
        case type.FETCH_BRANCH_DETAIL:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_BRANCH_DETAIL_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.branch
            }
        case type.FETCH_BRANCH_DETAIL_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function updateBranchReducer (state = initialUpdateBranchState, action) {
    switch (action.type) {
        case type.UPDATE_BRANCH:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_BRANCH_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.UPDATE_BRANCH_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function addBranchReducer (state = initialAddBranchState, action) {
    switch (action.type) {
        case type.ADD_BRANCH:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ADD_BRANCH_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ADD_BRANCH_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}


export function fetchDesignationsReducer (state = initialFetchDesignationsState, action) {
    switch (action.type) {
        case type.FETCH_DESIGNATIONS:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_DESIGNATIONS_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.designations
            }
        case type.FETCH_DESIGNATIONS_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function fetchDesignationReducer (state = initialFetchDesignationState, action) {
    switch (action.type) {
        case type.FETCH_DESIGNATION_DETAIL:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_DESIGNATION_DETAIL_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.designation
            }
        case type.FETCH_DESIGNATION_DETAIL_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function updateDesignationReducer (state = initialUpdateDesignationState, action) {
    switch (action.type) {
        case type.UPDATE_DESIGNATION:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_DESIGNATION_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.UPDATE_DESIGNATION_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function addDesignationReducer (state = initialAddDesignationState, action) {
    switch (action.type) {
        case type.ADD_DESIGNATION:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ADD_DESIGNATION_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ADD_DESIGNATION_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}


export function fetchGroupsReducer (state = initialFetchGroupsState, action) {
    switch (action.type) {
        case type.FETCH_GROUPS:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_GROUPS_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.groups
            }
        case type.FETCH_GROUPS_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function fetchGroupReducer (state = initialFetchGroupState, action) {
    switch (action.type) {
        case type.FETCH_GROUP_DETAIL:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_GROUP_DETAIL_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.group
            }
        case type.FETCH_GROUP_DETAIL_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function updateGroupReducer (state = initialUpdateGroupState, action) {
    switch (action.type) {
        case type.UPDATE_GROUP:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_GROUP_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.UPDATE_GROUP_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function addGroupReducer (state = initialAddGroupState, action) {
    switch (action.type) {
        case type.ADD_GROUP:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ADD_GROUP_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ADD_GROUP_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}


export function fetchCentresReducer (state = initialFetchCentresState, action) {
    switch (action.type) {
        case type.FETCH_CENTRES:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_CENTRES_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.centers
            }
        case type.FETCH_CENTRES_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function fetchCentreReducer (state = initialFetchCentreState, action) {
    switch (action.type) {
        case type.FETCH_CENTRE_DETAIL:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_CENTRE_DETAIL_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.center
            }
        case type.FETCH_CENTRE_DETAIL_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function updateCentreReducer (state = initialUpdateCentreState, action) {
    switch (action.type) {
        case type.UPDATE_CENTRE:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_CENTRE_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.UPDATE_CENTRE_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}
export function addCentreReducer (state = initialAddCentreState, action) {
    switch (action.type) {
        case type.ADD_CENTRE:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ADD_CENTRE_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ADD_CENTRE_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                error: action.data.message
            }
        default:
            return state;
    }
}