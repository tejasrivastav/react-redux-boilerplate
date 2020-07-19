import concat from 'lodash/concat';

import {
  CHANGE_USERNAME, CHANGE_TAB, DELETE_POST, RELOAD_POSTS
} from './constants';

// The initial state of the App
const initialState = {
  username: '',
  activeIndex: 0,
  deletedPosts: []
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
    default:
      return state;
  }
}

export default homeReducer;
