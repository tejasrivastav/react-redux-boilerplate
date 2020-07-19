import homeReducer from '../reducer';
import { changeUsername, changeTab, deletePost } from '../actions';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      username: '',
      activeIndex: 0,
      deletedPosts: []
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeUsername action correctly', () => {
    const fixture = 'flexdinesh';
    const expectedResult = { ...state, username: fixture };

    expect(homeReducer(state, changeUsername(fixture))).toEqual(expectedResult);
  });

  it('should handle the tab change correctly', () => {
    const fixture = 1;
    const expectedResult = { ...state, activeIndex: 1 };

    expect(homeReducer(state, changeTab(fixture))).toEqual(expectedResult);
  });

  it('should handle the delete action correctly', () => {
    const fixture = 1;
    const expectedResult = { ...state, deletedPosts: [1] };

    expect(homeReducer(state, deletePost(fixture))).toEqual(expectedResult);
  });
});
