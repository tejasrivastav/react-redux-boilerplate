import appReducer from '../reducer';
import { loadRepos, postsLoaded, postLoadingError } from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      currentUser: false,
      userData: {
        repositories: false,
      },
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = {
      ...state,
      loading: true,
      error: false,
      userData: { repositories: false },
    };
    expect(appReducer(state, loadRepos())).toEqual(expectedResult);
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
      userData: { repositories: fixture },
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
