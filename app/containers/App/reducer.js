import {
  LOAD_POSTS_SUCCESS, LOAD_POSTS, LOAD_POSTS_ERROR, categoriesName
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  posts: [],
  categoriesName
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        posts: []
      };

      return newState;
    }
    case LOAD_POSTS_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        posts: action.posts,
        currentUser: action.username,
      };
      return newState;
    }

    case LOAD_POSTS_ERROR: {
      return { ...state, error: action.error, loading: false };
    }
    default:
      return state;
  }
}

export default appReducer;
