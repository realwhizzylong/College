import {
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_RESET,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_RESET,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,
    POST_ALL_SUCCESS,
    POST_ALL_FAIL,
    POST_DETAIL_SUCCESS,
    POST_DETAIL_FAIL,
    POST_DETAIL_RESET,
    MY_POSTS_SUCCESS,
    MY_POSTS_FAIL,
    MY_POSTS_RESET,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAIL,
    POST_COMMENT_RESET
} from '../constants/postConstants';

export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_CREATE_SUCCESS:
            return {
                success: true,
                post: action.payload
            };
        case POST_CREATE_FAIL:
            return {
                error: action.payload
            };
        case POST_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const postUpdateReducer = (state = { post: {} }, action) => {
    switch (action.type) {
        case POST_UPDATE_SUCCESS:
            return {
                success: true
            };
        case POST_UPDATE_FAIL:
            return {
                error: action.payload
            };
        case POST_UPDATE_RESET:
            return {
                post: {}
            }
        default:
            return state;
    }
}

export const postDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_DELETE_SUCCESS:
            return {
                success: true
            };
        case POST_DELETE_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const postAllReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case POST_ALL_SUCCESS:
            return {
                posts: action.payload.posts,
                page: action.payload.page,
                pages: action.payload.pages
            };
        case POST_ALL_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const postDetailReducer = (state = { post: { comments: [] } }, action) => {
    switch (action.type) {
        case POST_DETAIL_SUCCESS:
            return {
                post: action.payload
            };
        case POST_DETAIL_FAIL:
            return {
                error: action.payload
            };
        case POST_DETAIL_RESET:
            return {
                post: { comments: [] }
            }
        default:
            return state;
    }
}

export const myPostsReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case MY_POSTS_SUCCESS:
            return {
                posts: action.payload
            };
        case MY_POSTS_FAIL:
            return {
                error: action.payload
            };
        case MY_POSTS_RESET:
            return {
                posts: []
            }
        default:
            return state;
    }
}

export const postCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_COMMENT_SUCCESS:
            return {
                success: true
            };
        case POST_COMMENT_FAIL:
            return {
                error: action.payload
            };
        case POST_COMMENT_RESET:
            return {}
        default:
            return state;
    }
}