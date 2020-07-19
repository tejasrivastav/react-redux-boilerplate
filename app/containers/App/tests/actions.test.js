import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_ERROR,
} from '../constants';

import {
  loadRepos,
  postsLoaded,
  postLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadRepos', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_POSTS,
      };

      expect(loadRepos()).toEqual(expectedResult);
    });
  });

  describe('postsLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const username = 'test';
      const expectedResult = {
        type: LOAD_POSTS_SUCCESS,
        repos: fixture,
        username,
      };

      expect(postsLoaded(fixture, username)).toEqual(expectedResult);
    });
  });

  describe('postLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_POSTS_ERROR,
        error: fixture,
      };

      expect(postLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
