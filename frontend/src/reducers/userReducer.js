export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };

    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "USER_DETAILS_RESET":
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_PROFILE_REQUEST":
      return { loading: true };
    case "USER_UPDATE_PROFILE_SUCCESS":
      return { loading: false, success: true, userInfo: action.payload };
    case "USER_UPDATE_PROFILE_FAIL":
      return { loading: false, error: action.payload };
    case "USER_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};

export const userMyPostsReducer = (state = { myposts: [] }, action) => {
  switch (action.type) {
    case "USER_MYPOSTS_REQUEST":
      return { loadingMyPosts: true };
    case "USER_MYPOSTS_SUCCESS":
      return { loadingMyPosts: false, myposts: action.payload };
    case "USER_MYPOSTS_FAIL":
      return { loadingMyPosts: false, errorMyPosts: action.payload };
    case "USER_MYPOSTS_RESET":
      return { myposts: [] };
    default:
      return state;
  }
};

export const savedPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case "POST_SAVEDLIST_REQUEST":
      return { loading: true, posts: [] };
    case "POST_SAVEDLIST_SUCCESS":
      return { loading: false, posts: action.payload };
    case "POST_SAVEDLIST_FAIL":
      return { loading: false, error: action.payload };
    case "POST_SAVEDLIST_RESET":
      return { posts: [] };
    default:
      return state;
  }
};

export const userPublicProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_PUBLIC_PROFILE_REQUEST":
      return { loading: true, ...state };
    case "USER_PUBLIC_PROFILE_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_PUBLIC_PROFILE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
