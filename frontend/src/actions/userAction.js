import axios from 'axios';
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
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_CHANGE_PASSWORD_FAIL,
    USER_BACKGROUND_SUCCESS,
    USER_BACKGROUND_FAIL,
    USER_BACKGROUND_RESET,
    USER_UPDATE_BACKGROUND_SUCCESS,
    USER_UPDATE_BACKGROUND_FAIL
} from '../constants/userConstants';
import { MY_ADMISSIONS_RESET } from '../constants/admissionConstants';
import { MY_POSTS_RESET } from '../constants/postConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', { email, password }, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const register = (username, email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/register', { username, email, password }, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: USER_PROFILE_RESET
    })
    dispatch({
        type: USER_BACKGROUND_RESET
    })
    dispatch({
        type: MY_ADMISSIONS_RESET
    })
    dispatch({
        type: MY_POSTS_RESET
    })
    document.location.href = '/login';
}

export const getProfile = () => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/users/profile', config);
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put('/api/users/profile', user, config);
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const changePassword = (user) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put('/api/users/changepassword', user, config);
        dispatch({
            type: USER_CHANGE_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_CHANGE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBackground = () => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/users/background', config);
        dispatch({
            type: USER_BACKGROUND_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_BACKGROUND_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateBackground = (user) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put('/api/users/background', user, config);
        dispatch({
            type: USER_UPDATE_BACKGROUND_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_BACKGROUND_FAIL,
            payload: error.response.data.message
        })
    }
}