import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { postListReducer, postDetailReducer, createPostReducer, updatePostReducer, deletePostReducer, commentPostReducer, userpostListReducer, likePostReducer, unlikePostReducer, savePostReducer, unsavePostReducer, createReportReducer } from './reducers/postReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userMyPostsReducer, savedPostReducer } from './reducers/userReducer'

const reducer = combineReducers({
    postList: postListReducer,
    postDetail: postDetailReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userMyPosts: userMyPostsReducer,
    createPost: createPostReducer,
    updatePost: updatePostReducer,
    deletePost: deletePostReducer,
    commentPost: commentPostReducer,
    userposts: userpostListReducer,
    likePost: likePostReducer,
    unlikePost: unlikePostReducer,
    savePost: savePostReducer,
    unsavePost: unsavePostReducer,
    savedPost: savedPostReducer,
    reportPost: createReportReducer
})


const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null




const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    }
}



const middleware = [thunk]


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store