import { closeLoader, openLoader } from '../../../utils/Loader';
import OpenNotification from '../../../utils/OpenNotification';
import * as type from '../../types';

const initialCreateWebinarState = {
    response: {},
    loading: false,
    error: null
};
const initialGetWebinarState = {
    response: {},
    loading: false,
    error: null
};
const initialUpdateWebinarState = {
    response: {},
    loading: false,
    error: null
};
const initialDisableWebinarState = {
    response: {},
    loading: false,
    error: null
};
const initialWebinarListState = {
    response: {},
    loading: false,
    error: null
};
const initialGetBookedDatesState = {
    response: {},
    loading: false,
    error: null
};

export function addWebinarReducer(state = initialCreateWebinarState, action) {
    switch (action.type) {
        case type.CREATE_WEBINAR:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.CREATE_WEBINAR_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                response: action.data,
                loading: false
            }
        case type.CREATE_WEBINAR_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case type.CLEAR_CREATE_WEBINAR:
            return {
                ...state,
                loading: false,
                response: {}
            }
        default:
            return state
    }
}

export function getWebinarsReducer(state = initialWebinarListState, action) {
    switch (action.type) {
        case type.FETCH_WEBINARS:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_WEBINARS_SUCCESS:
            closeLoader();
            return {
                ...state,
                response: action.data.webinars,
                loading: false
            }
        case type.FETCH_WEBINARS_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export function getWebinarDetailsReducer(state = initialGetWebinarState, action) {
    switch (action.type) {
        case type.FETCH_WEBINAR_DETAIL:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_WEBINAR_DETAIL_SUCCESS:
            closeLoader();
            return {
                ...state,
                response: action.data.webinar,
                loading: false
            }
        case type.FETCH_WEBINAR_DETAIL_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export function updateWebinarReducer(state = initialUpdateWebinarState, action) {
    switch (action.type) {
        case type.UPDATE_WEBINAR:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.UPDATE_WEBINAR_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                response: action.data,
                loading: false
            }
        case type.UPDATE_WEBINAR_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case type.CLEAR_UPDATE_WEBINAR:
            return {
                ...state,
                loading: false,
                response: {}
            }
        default:
            return state
    }
}

export function disableWebinarReducer(state = initialDisableWebinarState, action) {
    switch (action.type) {
        case type.DISABLE_WEBINAR:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.DISABLE_WEBINAR_SUCCESS:
            closeLoader();
            OpenNotification("success", "Success", action.data.message);
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case type.DISABLE_WEBINAR_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export function getBookedDatesReducer(state = initialGetBookedDatesState, action) {
    switch (action.type) {
        case type.FETCH_BOOKED_DATES:
            openLoader();
            return {
                ...state,
                loading: true
            }
        case type.FETCH_BOOKED_DATES_SUCCESS:
            closeLoader();
            return {
                ...state,
                response: action.data,
                loading: false
            }
        case type.FETCH_BOOKED_DATES_FAILURE:
            closeLoader();
            OpenNotification("error", "Error", action.message);
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}