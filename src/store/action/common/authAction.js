import * as type from '../../types';

export function loginAction(data) {
    return {
        type: type.FETCH_LOGIN,
        payload: data
    }
}

export function setUser(data) {
    return {
        type: type.SET_USER,
        data
    }
}

export function getAnalytics() {
    return {
        type: type.FETCH_ANALYTICS,
    }
}

export function forgotPassword(data) {
    return {
        type: type.FORGOT_PASSWORD,
        payload: data
    }
}

export function resetPassword(data) {
    return {
        type: type.RESET_PASSWORD,
        payload: data
    }
}

export function clearForgotPassword() {
    return {
        type: type.FORGOT_PASSWORD_CLEAR
    }
}
export function clearResetPassword() {
    return {
        type: type.RESET_PASSWORD_CLEAR
    }
}