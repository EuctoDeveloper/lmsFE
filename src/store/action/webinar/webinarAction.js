import * as type from '../../types';

export function createWebinar(data) {
    return {
        type: type.CREATE_WEBINAR,
        payload: data
    }
}
export function clearCreateWebinar() {
    return {
        type: type.CLEAR_CREATE_WEBINAR
    }
}
export function clearUpdateWebinar() {
    return {
        type: type.CLEAR_UPDATE_WEBINAR
    }
}
export function getWebinars() {
    return {
        type: type.FETCH_WEBINARS,
    }
}
export function getWebinarDetails(data, id) {
    return {
        type: type.FETCH_WEBINAR_DETAIL,
        payload: data
    }
}
export function updateWebinar(data, id) {
    return {
        type: type.UPDATE_WEBINAR,
        payload: {data, id}
    }
}
export function disableWebinar(data) {
    return {
        type: type.DISABLE_WEBINAR,
        payload: data
    }
}
export function getBookedDates(date) {
    return {
        type: type.FETCH_BOOKED_DATES,
        payload: date
    }
}