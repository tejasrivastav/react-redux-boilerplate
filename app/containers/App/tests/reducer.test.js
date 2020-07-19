import appReducer from '../reducer';
import { loadPosts, postsLoaded, postLoadingError } from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      currentUser: false,
      posts: []
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadPosts action correctly', () => {
    const expectedResult = {
      ...state,
      loading: true,
      error: false,
      posts: []
    };
    expect(appReducer(state, loadPosts())).toEqual(expectedResult);
  });

  it('should handle the postsLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ];
    const username = 'test';
    const expectedResult = {
      ...state,
      loading: false,
      currentUser: username,
      posts: []
    };

    expect(appReducer(state, postsLoaded(fixture, username))).toEqual(
      expectedResult,
    );
  });

  it('should handle the postLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };

    const expectedResult = {
      ...state,
      error: fixture,
      loading: false,
    };

    expect(appReducer(state, postLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });
});
