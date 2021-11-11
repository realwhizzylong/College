import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginReducer, registerReducer, userProfileReducer, userUpdateProfileReducer, userChangePasswordReducer, userBackgroundReducer, userUpdateBackgroundReducer } from './reducers/userReducer';
import { collegeListReducer, collegeDetailsReducer, collegeByNameReducer } from './reducers/collegeReducer';
import { admissionCreateReducer, admissionUpdateReducer, admissionDeleteReducer, admissionAllReducer, admissionDetailReducer, myAdmissionsReducer, admissionBackgroundReducer, admissionCommentReducer, admissionPercentageReducer } from './reducers/admissionReducer';
import { postCreateReducer, postUpdateReducer, postDeleteReducer, postAllReducer, postDetailReducer, myPostsReducer, postCommentReducer } from './reducers/postReducer';

const reducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userChangePassword: userChangePasswordReducer,
    userBackground: userBackgroundReducer,
    userUpdateBackground: userUpdateBackgroundReducer,
    collegeList: collegeListReducer,
    collegeDetails: collegeDetailsReducer,
    collegeByName: collegeByNameReducer,
    admissionCreate: admissionCreateReducer,
    admissionUpdate: admissionUpdateReducer,
    admissionDelete: admissionDeleteReducer,
    admissionAll: admissionAllReducer,
    admissionDetail: admissionDetailReducer,
    myAdmissions: myAdmissionsReducer,
    admissionBackground: admissionBackgroundReducer,
    admissionComment: admissionCommentReducer,
    admissionPercentage: admissionPercentageReducer,
    postCreate: postCreateReducer,
    postUpdate: postUpdateReducer,
    postDelete: postDeleteReducer,
    postAll: postAllReducer,
    postDetail: postDetailReducer,
    myPosts: myPostsReducer,
    postComment: postCommentReducer
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    login: {
        userInfo: userInfoFromLocalStorage
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;