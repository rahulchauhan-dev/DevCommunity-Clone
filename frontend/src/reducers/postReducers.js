export const postListReducer = (state = { posts: [] }, action) => {


    switch (action.type) {
        case 'POST_LIST_REQUEST':
            return { loading: true, posts: [] }
        case 'POST_LIST_SUCCESS':
            return { loading: false, posts: action.payload }
        case 'POST_LIST_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}

export const postDetailReducer = (state = { post: { comments: [] } }, action) => {


    switch (action.type) {
        case 'POST_DETAIL_REQUEST':
            return { loading: true, ...state }
        case 'POST_DETAIL_SUCCESS':
            return { loading: false, post: action.payload }
        case 'POST_DETAIL_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}

export const createPostReducer = (state = {}, action) => {


    switch (action.type) {
        case 'POST_CREATE_REQUEST':
            return { loading: true }
        case 'POST_CREATE_SUCCESS':
            return { loading: false, success: true, post: action.payload }
        case 'POST_CREATE_FAIL':
            return { loading: false, error: action.payload }
        case 'POST_CREATE_RESET':
            return {}

        default:
            return state;
    }

}


export const updatePostReducer = (state = { post: {} }, action) => {


    switch (action.type) {
        case 'POST_UPDATE_REQUEST':
            return { loading: true }
        case 'POST_UPDATE_SUCCESS':
            return { loading: false, success: true, post: action.payload }
        case 'POST_UPDATE_FAIL':
            return { loading: false, error: action.payload }
        case 'POST_UPDATE_RESET':
            return { post: {} }
        default:
            return state;
    }

}

export const deletePostReducer = (state = {}, action) => {


    switch (action.type) {
        case 'POST_DELETE_REQUEST':
            return { loading: true }
        case 'POST_DELETE_SUCCESS':
            return { loading: false, success: true }
        case 'POST_DELETE_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}

export const commentPostReducer = (state = {}, action) => {


    switch (action.type) {
        case 'POST_COMMENT_REQUEST':
            return { loading: true }
        case 'POST_COMMENT_SUCCESS':
            return { loading: false, success: true }
        case 'POST_COMMENT_FAIL':
            return { loading: false, error: action.payload }
        case 'POST_COMMENT_RESET':
            return {}
        default:
            return state;
    }

}

export const userpostListReducer = (state = { userposts: [] }, action) => {


    switch (action.type) {
        case 'USERPOST_LIST_REQUEST':
            return { loading: true, userposts: [] }
        case 'USERPOST_LIST_SUCCESS':
            return { loading: false, userposts: action.payload }
        case 'USERPOST_LIST_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}

export const likePostReducer = (state = {}, action) => {


    switch (action.type) {
        case 'POST_LIKE_REQUEST':
            return { loading: true }
        case 'POST_LIKE_SUCCESS':
            return { loading: false, success: true }
        case 'POST_LIKE_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}


export const unlikePostReducer = (state = {}, action) => {


    switch (action.type) {
        case 'POST_UNLIKE_REQUEST':
            return { loading: true }
        case 'POST_UNLIKE_SUCCESS':
            return { loading: false, success: true }
        case 'POST_UNLIKE_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}

export const savePostReducer = (state = {}, action) => {


    switch (action.type) {
        case 'POST_SAVE_REQUEST':
            return { loading: true }
        case 'POST_SAVE_SUCCESS':
            return { loading: false, success: true }
        case 'POST_SAVE_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}


export const unsavePostReducer = (state = {}, action) => {


    switch (action.type) {
        case 'POST_UNSAVE_REQUEST':
            return { loading: true }
        case 'POST_UNSAVE_SUCCESS':
            return { loading: false, success: true }
        case 'POST_UNSAVE_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}

export const createReportReducer = (state = {}, action) => {


    switch (action.type) {
        case 'REPORT_CREATE_REQUEST':
            return { loading: true }
        case 'REPORT_CREATE_SUCCESS':
            return { loading: false, success: true }
        case 'REPORT_CREATE_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}