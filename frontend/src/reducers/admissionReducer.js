import {
    ADMISSION_CREATE_SUCCESS,
    ADMISSION_CREATE_FAIL,
    ADMISSION_CREATE_RESET,
    ADMISSION_UPDATE_SUCCESS,
    ADMISSION_UPDATE_FAIL,
    ADMISSION_UPDATE_RESET,
    ADMISSION_DELETE_SUCCESS,
    ADMISSION_DELETE_FAIL,
    ADMISSION_ALL_SUCCESS,
    ADMISSION_ALL_FAIL,
    ADMISSION_DETAIL_SUCCESS,
    ADMISSION_DETAIL_FAIL,
    ADMISSION_DETAIL_RESET,
    MY_ADMISSIONS_SUCCESS,
    MY_ADMISSIONS_FAIL,
    MY_ADMISSIONS_RESET,
    ADMISSION_BACKGROUND_SUCCESS,
    ADMISSION_BACKGROUND_FAIL,
    ADMISSION_COMMENT_SUCCESS,
    ADMISSION_COMMENT_FAIL,
    ADMISSION_COMMENT_RESET,
    ADMISSION_PERCENTAGE_SUCCESS,
    ADMISSION_PERCENTAGE_FAIL,
    ADMISSION_PERCENTAGE_RESET
} from '../constants/admissionConstants';

export const admissionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMISSION_CREATE_SUCCESS:
            return {
                success: true,
                admission: action.payload
            };
        case ADMISSION_CREATE_FAIL:
            return {
                error: action.payload
            };
        case ADMISSION_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const admissionUpdateReducer = (state = { admission: {} }, action) => {
    switch (action.type) {
        case ADMISSION_UPDATE_SUCCESS:
            return {
                success: true
            };
        case ADMISSION_UPDATE_FAIL:
            return {
                error: action.payload
            };
        case ADMISSION_UPDATE_RESET:
            return {
                admission: {}
            }
        default:
            return state;
    }
}

export const admissionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMISSION_DELETE_SUCCESS:
            return {
                success: true
            };
        case ADMISSION_DELETE_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const admissionAllReducer = (state = { admissions: [] }, action) => {
    switch (action.type) {
        case ADMISSION_ALL_SUCCESS:
            return {
                admissions: action.payload.admissions,
                page: action.payload.page,
                pages: action.payload.pages
            };
        case ADMISSION_ALL_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const admissionDetailReducer = (state = { admission: { comments: [] } }, action) => {
    switch (action.type) {
        case ADMISSION_DETAIL_SUCCESS:
            return {
                admission: action.payload
            };
        case ADMISSION_DETAIL_FAIL:
            return {
                error: action.payload
            };
        case ADMISSION_DETAIL_RESET:
            return {
                admission: { comments: [] }
            }
        default:
            return state;
    }
}

export const myAdmissionsReducer = (state = { admissions: [] }, action) => {
    switch (action.type) {
        case MY_ADMISSIONS_SUCCESS:
            return {
                admissions: action.payload
            };
        case MY_ADMISSIONS_FAIL:
            return {
                error: action.payload
            };
        case MY_ADMISSIONS_RESET:
            return {
                admissions: []
            }
        default:
            return state;
    }
}

export const admissionBackgroundReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ADMISSION_BACKGROUND_SUCCESS:
            return {
                user: action.payload
            };
        case ADMISSION_BACKGROUND_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const admissionCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMISSION_COMMENT_SUCCESS:
            return {
                success: true
            };
        case ADMISSION_COMMENT_FAIL:
            return {
                error: action.payload
            };
        case ADMISSION_COMMENT_RESET:
            return {}
        default:
            return state;
    }
}

export const admissionPercentageReducer = (state = { percentage: {} }, action) => {
    switch (action.type) {
        case ADMISSION_PERCENTAGE_SUCCESS:
            return {
                percentage: action.payload
            };
        case ADMISSION_PERCENTAGE_FAIL:
            return {
                error: action.payload
            };
        case ADMISSION_PERCENTAGE_RESET:
            return {
                percentage: {}
            }
        default:
            return state;
    }
}