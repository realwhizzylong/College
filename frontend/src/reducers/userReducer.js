import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_CHANGE_PASSWORD_FAIL,
    USER_BACKGROUND_SUCCESS,
    USER_BACKGROUND_FAIL,
    USER_BACKGROUND_RESET,
    USER_UPDATE_BACKGROUND_SUCCESS,
    USER_UPDATE_BACKGROUND_FAIL,
    USER_UPDATE_BACKGROUND_RESET
} from '../constants/userConstants';

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                userInfo: action.payload
            };
        case LOGIN_FAIL:
            return {
                error: action.payload
            };
        case LOGOUT:
            return {}
        default:
            return state;
    }
}

export const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                userInfo: action.payload
            };
        case REGISTER_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const userProfileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_PROFILE_SUCCESS:
            return {
                user: action.payload
            };
        case USER_PROFILE_FAIL:
            return {
                error: action.payload
            };
        case USER_PROFILE_RESET:
            return {
                user: {}
            }
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                success: true, userInfo: action.payload
            };
        case USER_UPDATE_PROFILE_FAIL:
            return {
                error: action.payload
            };
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state;
    }
}

export const userChangePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CHANGE_PASSWORD_SUCCESS:
            return {
                success: true, userInfo: action.payload
            };
        case USER_CHANGE_PASSWORD_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const userBackgroundReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_BACKGROUND_SUCCESS:
            return {
                user: action.payload
            };
        case USER_BACKGROUND_FAIL:
            return {
                error: action.payload
            };
        case USER_BACKGROUND_RESET:
            return {
                user: {}
            }
        default:
            return state;
    }
}

export const userUpdateBackgroundReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_BACKGROUND_SUCCESS:
            return {
                success: true, userInfo: action.payload
            };
        case USER_UPDATE_BACKGROUND_FAIL:
            return {
                error: action.payload
            };
        case USER_UPDATE_BACKGROUND_RESET:
            return {}
        default:
            return state;
    }
}