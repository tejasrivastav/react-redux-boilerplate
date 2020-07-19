import { LOAD_POSTS_SUCCESS, LOAD_POSTS, LOAD_POSTS_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  repos: []
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        repos: []
      };

      return newState;
    }
    case LOAD_POSTS_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        repos: action.repos,
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
