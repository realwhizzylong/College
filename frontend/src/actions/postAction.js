import axios from 'axios';
import {
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,
    POST_ALL_SUCCESS,
    POST_ALL_FAIL,
    POST_DETAIL_SUCCESS,
    POST_DETAIL_FAIL,
    MY_POSTS_SUCCESS,
    MY_POSTS_FAIL,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAIL
} from '../constants/postConstants';

export const createPost = (post) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/posts', post, config);
        dispatch({
            type: POST_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePost = (post) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/posts/${post._id}`, post, config);
        dispatch({
            type: POST_UPDATE_SUCCESS,
        })
        dispatch({
            type: POST_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deletePost = (id) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/posts/${id}`, config);
        dispatch({
            type: POST_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: POST_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAllPosts = (keyword = "", pageNum = "") => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/posts?keyword=${keyword}&pageNum=${pageNum}`);
        dispatch({
            type: POST_ALL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_ALL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getPostDetail = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: POST_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMyPosts = () => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/posts/myposts', config);
        dispatch({
            type: MY_POSTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MY_POSTS_FAIL,
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
        const { data } = await axios.post(`/api/posts/${id}/comments`, comment, config);
        dispatch({
            type: POST_COMMENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}