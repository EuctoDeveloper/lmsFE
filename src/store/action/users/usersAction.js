import * as type from '../../types';

export function loginAction(data) {
    return {
        type: type.FETCH_LOGIN,
        payload: data
    }
}

export function getCustomers() {
    return {
        type: type.FETCH_CUSTOMERS,
    }
}

export function getStaffs() {
    return {
        type: type.FETCH_STAFFS,
    }
}

export function getAdmins() {
    return {
        type: type.FETCH_ADMINS,
    }
}

export function getUserDetail(userId) {
    return {
        type: type.FETCH_USER_DETAIL,
        payload: userId
    }
}

export function createUser(data) {
    const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
    };
    if(data.userType === 'client') {
        payload.locationId = data.locationId;
        payload.centerId = data.centerId;
        payload.groupId = data.groupId;
        return {
            type: type.CREATE_CUSTOMER,
            payload: payload
        }
    } else if(data.userType === 'staff') {
        payload.departmentId = data.departmentId;
        payload.designationId = data.designationId;
        payload.branchId = data.branchId;
        return {
            type: type.CREATE_STAFF,
            payload: payload
        }
    } else {
        payload.departmentId = data.departmentId;
        payload.designationId = data.designationId;
        payload.branchId = data.branchId;
        return {
            type: type.CREATE_ADMIN,
            payload: payload
        }
    }
}

export function updateUser(id, data) {
    const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
    };
    if(data.userType === 'client') {
        payload.locationId = data.locationId;
        payload.centerId = data.centerId;
        payload.groupId = data.groupId;

        return {
            type: type.UPDATE_CUSTOMER,
            id: id,
            payload: payload
        }
    } else if(data.userType === 'course admin' || data.userType === "staff") {
        payload.departmentId = data.departmentId;
        payload.designationId = data.designationId;
        payload.branchId = data.branchId;
        return {
            type: type.UPDATE_STAFF,
            id: id,
            payload: payload
        }
    } else {
        return {
            type: type.UPDATE_ADMIN,
            id: id,
            payload: payload
        }
    }
}

export function deactivateUser(id) {
    return {
        type: type.DEACTIVATE_USER,
        payload: id
    }
}

export function activateUser(id) {
    return {
        type: type.ACTIVATE_USER,
        payload: id
    }
}

export function getCourseProgressListByUserId(id) {
    return {
        type: type.FETCH_COURSE_PROGRESS_LIST_BY_USER_ID,
        payload: id
    }
}

export function getUserProgressListByCourseId(id) {
    return {
        type: type.FETCH_USER_PROGRESS_LIST_BY_COURSE_ID,
        payload: id
    }
}

export function getCourseProgressDetail(courseId, userId) {
    return {
        type: type.FETCH_COURSE_PROGRESS_DETAIL,
        payload: {courseId, userId}
    }
}
