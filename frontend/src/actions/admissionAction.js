import axios from 'axios';
import {
    ADMISSION_CREATE_SUCCESS,
    ADMISSION_CREATE_FAIL,
    ADMISSION_UPDATE_SUCCESS,
    ADMISSION_UPDATE_FAIL,
    ADMISSION_DELETE_SUCCESS,
    ADMISSION_DELETE_FAIL,
    ADMISSION_ALL_SUCCESS,
    ADMISSION_ALL_FAIL,
    ADMISSION_DETAIL_SUCCESS,
    ADMISSION_DETAIL_FAIL,
    MY_ADMISSIONS_SUCCESS,
    MY_ADMISSIONS_FAIL,
    ADMISSION_BACKGROUND_SUCCESS,
    ADMISSION_BACKGROUND_FAIL,
    ADMISSION_COMMENT_SUCCESS,
    ADMISSION_COMMENT_FAIL,
    ADMISSION_PERCENTAGE_SUCCESS,
    ADMISSION_PERCENTAGE_FAIL
} from '../constants/admissionConstants';

export const createAdmissionResult = (admission) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/admissions', admission, config);
        dispatch({
            type: ADMISSION_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMISSION_CREATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateAdmissionResult = (admission) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/admissions/${admission._id}`, admission, config);
        dispatch({
            type: ADMISSION_UPDATE_SUCCESS,
        })
        dispatch({
            type: ADMISSION_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMISSION_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteAdmissionResult = (id) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/admissions/${id}`, config);
        dispatch({
            type: ADMISSION_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: ADMISSION_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAllAdmissions = (keyword = "", pageNum = "") => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/admissions?keyword=${keyword}&pageNum=${pageNum}`);
        dispatch({
            type: ADMISSION_ALL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMISSION_ALL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdmissionDetail = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/admissions/${id}`);
        dispatch({
            type: ADMISSION_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMISSION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMyAdmissions = () => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/admissions/myadmissions', config);
        dispatch({
            type: MY_ADMISSIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MY_ADMISSIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdmissionBackground = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/users/admissionBackground/${id}`);
        dispatch({
            type: ADMISSION_BACKGROUND_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMISSION_BACKGROUND_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addComment = (id, comment) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/admissions/${id}/comments`, comment, config);
        dispatch({
            type: ADMISSION_COMMENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMISSION_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdmissionPercentage = (collegeName) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/admissions/percentage', collegeName, config);
        dispatch({
            type: ADMISSION_PERCENTAGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMISSION_PERCENTAGE_FAIL,
            payload: error.response.data.message
        })
    }
}