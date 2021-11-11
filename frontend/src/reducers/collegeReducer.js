import {
    COLLEGE_LIST_SUCCESS,
    COLLEGE_LIST_FAIL,
    COLLEGE_DETAILS_SUCCESS,
    COLLEGE_DETAILS_FAIL,
    COLLEGE_BY_NAME_SUCCESS,
    COLLEGE_BY_NAME_FAIL
} from '../constants/collegeConstants';

export const collegeListReducer = (state = { colleges: [] }, action) => {
    switch (action.type) {
        case COLLEGE_LIST_SUCCESS:
            return {
                colleges: action.payload
            };
        case COLLEGE_LIST_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const collegeDetailsReducer = (state = { college: {} }, action) => {
    switch (action.type) {
        case COLLEGE_DETAILS_SUCCESS:
            return {
                college: action.payload
            };
        case COLLEGE_DETAILS_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const collegeByNameReducer = (state = { college: {} }, action) => {
    switch (action.type) {
        case COLLEGE_BY_NAME_SUCCESS:
            return {
                college: action.payload
            };
        case COLLEGE_BY_NAME_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}