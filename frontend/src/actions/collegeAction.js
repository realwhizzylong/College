import axios from 'axios';
import {
    COLLEGE_LIST_SUCCESS,
    COLLEGE_LIST_FAIL,
    COLLEGE_DETAILS_SUCCESS,
    COLLEGE_DETAILS_FAIL,
    COLLEGE_BY_NAME_SUCCESS,
    COLLEGE_BY_NAME_FAIL
} from '../constants/collegeConstants';

export const getColleges = (keyword = "") => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/colleges?keyword=${keyword}`);
        dispatch({
            type: COLLEGE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COLLEGE_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getCollegeDetails = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/colleges/${id}`);
        dispatch({
            type: COLLEGE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COLLEGE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getCollegeByName = (collegeName) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/colleges/name', collegeName, config);
        dispatch({
            type: COLLEGE_BY_NAME_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COLLEGE_BY_NAME_FAIL,
            payload: error.response.data.message
        })
    }
}