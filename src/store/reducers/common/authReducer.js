import { postLoginFn } from '../../../constants/helper';
import { closeLoader, openLoader } from '../../../utils/Loader';
import OpenNotification from '../../../utils/OpenNotification';
import * as type from '../../types';

const initialLoginState = {
    response: {},
    loading: false,
    error: null
}
const initialUserState = {
    response: {},
    loading: false,
    error: null
}
const initalForgotPasswordState = {
    response: {},
    loading: false,
    error: null
}
const initalResetPasswordState = {
    response: {},
    loading: false,
    error: null
}
const initialAnalyticsState = {
    response: {},
    loading: false,
    error: null
}

export function loginReducer(state = initialLoginState, action) {
    switch (action.type) {
        case type.FETCH_LOGIN:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_LOGIN_SUCCESS:
            closeLoader();
            postLoginFn(action.data.data);
            document.location.href = "/";
            return {
                ...state,
                loading: false,
                response: action.data.data
            }
        case type.FETCH_LOGIN_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                loading: false,
                response: action.message
            }
        case type.FETCH_LOGIN_CLEAR:
            return {
                ...state,
                loading: false,
                response: {}
            }
        default:
            return state
    }
}

export function userReducer(state = initialUserState, action) {
    switch (action.type) {
        case type.SET_USER:
            return {
                ...state,
                loading: false,
                response: action.data
            }
        default:
            return state
    }
}

export function forgotPasswordReducer(state = initalForgotPasswordState, action) {
    switch (action.type) {
        case type.FORGOT_PASSWORD:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FORGOT_PASSWORD_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.FORGOT_PASSWORD_FAILURE:
            OpenNotification("error", "Error", action.message);
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.message
            }
        case type.FORGOT_PASSWORD_CLEAR:
            return {
                ...state,
                loading: false,
                response: {}
            }
        default:
            return state
    }
}

export function resetPasswordReducer(state = initalResetPasswordState, action) {
    switch (action.type) {
        case type.RESET_PASSWORD:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.RESET_PASSWORD_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.RESET_PASSWORD_FAILURE:
            OpenNotification("error", "Error", action.message);
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.message
            }
        case type.RESET_PASSWORD_CLEAR:
            return {
                ...state,
                loading: false,
                response: {}
            }
        default:
            return state
    }
}

export function analyticsReducer(state = initialAnalyticsState, action) {
    switch (action.type) {
        case type.FETCH_ANALYTICS:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_ANALYTICS_SUCCESS:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.data
            }
        case type.FETCH_ANALYTICS_FAILURE:
            closeLoader();
            return {
                ...state,
                loading: false,
                response: action.message
            }
        default:
            return state
    }
}