import { CHANGE_USERNAME, CHANGE_TAB } from './constants';

// The initial state of the App
const initialState = {
  username: '',
  activeIndex: 0
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return { ...state, username: action.name.replace(/@/gi, '') };
    case CHANGE_TAB:
      return { ...state, activeIndex: action.index };
    default:
      return state;
  }
}

export default homeReducer;
