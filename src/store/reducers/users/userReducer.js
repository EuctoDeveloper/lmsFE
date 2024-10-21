import { closeLoader, openLoader } from '../../../utils/Loader';
import OpenNotification from '../../../utils/OpenNotification';
import * as type from '../../types';

const initialCustomerState = {
    response: {},
    loading: false,
    error: null
}
const initialStaffState = {
    response: {},
    loading: false,
    error: null
}
const initialUserDetailState = {
    response: {},
    loading: false,
    error: null
}
const initialcreateUserState = {
    response: {},
    loading: false,
    error: null
}
const initialUpdateUserState = {
    response: {},
    loading: false,
    error: null
}
const initialAdminState = {
    response: {},
    loading: false,
    error: null
}
const initialDeactivateuserState = {
    response: {},
    loading: false,
    error: null
}
const initialActivateuserState = {
    response: {},
    loading: false,
    error: null
}

export function customerListReducer(state = initialCustomerState, action) {
    switch (action.type) {
        case type.FETCH_CUSTOMERS:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_CUSTOMERS_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.FETCH_CUSTOMERS_FAILURE:
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

export function staffListReducer(state = initialStaffState, action) {
    switch (action.type) {
        case type.FETCH_STAFFS:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_STAFFS_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.FETCH_STAFFS_FAILURE:
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

export function adminListReducer(state = initialAdminState, action) {
    switch (action.type) {
        case type.FETCH_ADMINS:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_ADMINS_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.FETCH_ADMINS_FAILURE:
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

export function userDetailReducer(state = initialUserDetailState, action) {
    switch (action.type) {
        case type.FETCH_USER_DETAIL:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_USER_DETAIL_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.FETCH_USER_DETAIL_FAILURE:
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

export function createUserReducer(state = initialcreateUserState, action) {
    switch (action.type) {
        case type.CREATE_CUSTOMER:
        case type.CREATE_STAFF:
        case type.CREATE_ADMIN:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.CREATE_CUSTOMER_SUCCESS:
        case type.CREATE_STAFF_SUCCESS:
        case type.CREATE_ADMIN_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.CREATE_CUSTOMER_FAILURE:
        case type.CREATE_STAFF_FAILURE:
        case type.CREATE_ADMIN_FAILURE:
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

export function updateUserReducer(state = initialUpdateUserState, action) {
    switch (action.type) {
        case type.UPDATE_CUSTOMER:
        case type.UPDATE_STAFF:
        case type.UPDATE_ADMIN:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_CUSTOMER_SUCCESS:
        case type.UPDATE_STAFF_SUCCESS:
        case type.UPDATE_ADMIN_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.UPDATE_CUSTOMER_FAILURE:
        case type.UPDATE_STAFF_FAILURE:
        case type.UPDATE_ADMIN_FAILURE:
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

export function deactivateUserReducer(state = initialDeactivateuserState, action) {
    switch (action.type) {
        case type.DEACTIVATE_USER:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.DEACTIVATE_USER_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.DEACTIVATE_USER_FAILURE:
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

export function activateUserReducer(state = initialActivateuserState, action) {
    switch (action.type) {
        case type.ACTIVATE_USER:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.ACTIVATE_USER_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.ACTIVATE_USER_FAILURE:
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