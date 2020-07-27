import concat from 'lodash/concat';

import {
  CHANGE_USERNAME, CHANGE_TAB, DELETE_POST, RELOAD_POSTS, UPDATE_QUERY, SEARCH_PERFORMED
} from './constants';

// The initial state of the App
const initialState = {
  username: '',
  activeIndex: 0,
  deletedPosts: [],
  query: "",
  searchResults: []
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return { ...state, username: action.name.replace(/@/gi, '') };
    case CHANGE_TAB:
      return { ...state, activeIndex: action.index };
    case DELETE_POST:
      return { ...state, deletedPosts: concat(state.deletedPosts, action.index) };
    case RELOAD_POSTS:
      return { ...state, deletedPosts: [] };
    case UPDATE_QUERY:
      return { ...state, query: action.text };
    case SEARCH_PERFORMED:
      return { ...state, searchResults: action.results };
    default:
      return state;
  }
}

export default homeReducer;
