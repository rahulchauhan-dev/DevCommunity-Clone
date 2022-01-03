import axios from "axios"

export const listPosts = (keyword = '') => async (dispatch) => {


    try {
        dispatch({ type: 'POST_LIST_REQUEST' })

        const { data } = await axios.get(`/api/posts?keyword=${keyword}`)

        dispatch({
            type: 'POST_LIST_SUCCESS',
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: 'POST_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const detailPost = (id) => async (dispatch) => {


    try {
        dispatch({ type: 'POST_DETAIL_REQUEST' })

        const { data } = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: 'POST_DETAIL_SUCCESS',
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: 'POST_DETAIL_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const createPostAction = (postData) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'POST_CREATE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/posts/', postData, config)

        dispatch({
            type: 'POST_CREATE_SUCCESS',
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: 'POST_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const updatePostAction = (postData, id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'POST_UPDATE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/posts/${id}`, postData, config)

        dispatch({
            type: 'POST_UPDATE_SUCCESS',
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: 'POST_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const deletePostAction = (id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'POST_DELETE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/posts/${id}`, {}, config)

        dispatch({
            type: 'POST_DELETE_SUCCESS',
        })

    }
    catch (error) {
        dispatch({
            type: 'POST_DELETE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const commentPostAction = (commentData, id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'POST_COMMENT_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/posts/${id}/discussions`, commentData, config)

        dispatch({
            type: 'POST_COMMENT_SUCCESS',
        })

    }
    catch (error) {
        dispatch({
            type: 'POST_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const listuserPosts = (userid) => async (dispatch) => {


    try {
        dispatch({ type: 'USERPOST_LIST_REQUEST' })

        const { data } = await axios.get(`/api/posts/byuser/${userid}`)


        dispatch({
            type: 'USERPOST_LIST_SUCCESS',
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: 'USERPOST_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const likePostAction = (id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'POST_LIKE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/posts/${id}/like`, {}, config)

        dispatch({
            type: 'POST_LIKE_SUCCESS',
        })

    }
    catch (error) {
        dispatch({
            type: 'POST_LIKE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const unlikePostAction = (id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'POST_UNLIKE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/posts/${id}/unlike`, {}, config)

        dispatch({
            type: 'POST_UNLIKE_SUCCESS',
        })

    }
    catch (error) {
        dispatch({
            type: 'POST_UNLIKE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const savePostAction = (id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'POST_SAVE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/posts/${id}/save`, {}, config)

        dispatch({
            type: 'POST_SAVE_SUCCESS',
        })

    }
    catch (error) {
        dispatch({
            type: 'POST_SAVE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const unsavePostAction = (id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'POST_UNSAVE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/posts/${id}/unsave`, {}, config)

        dispatch({
            type: 'POST_UNSAVE_SUCCESS',
        })

    }
    catch (error) {
        dispatch({
            type: 'POST_UNSAVE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const createReportAction = (reportData, id) => async (dispatch) => {


    try {
        dispatch({ type: 'REPORT_CREATE_REQUEST' })


        await axios.post(`/api/posts/${id}/report`, reportData)

        dispatch({
            type: 'REPORT_CREATE_SUCCESS',
        })

    }
    catch (error) {
        dispatch({
            type: 'REPORT_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}
