import {
  CHANGE_USERNAME, CHANGE_TAB, DELETE_POST, RELOAD_POSTS
} from '../constants';

import {
  changeUsername, changeTab, deletePost, reloadPosts
} from '../actions';

describe('Home Actions', () => {
  describe('changeUsername', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = 'Max';
      const expectedResult = {
        type: CHANGE_USERNAME,
        name: fixture
      };

      expect(changeUsername(fixture)).toEqual(expectedResult);
    });
  });

  describe('changeTab', () => {
    it('should return the correct type and the active index', () => {
      const fixture = 1;
      const expectedResult = {
        type: CHANGE_TAB,
        index: fixture
      };

      expect(changeTab(fixture)).toEqual(expectedResult);
    });
  });

  describe('deletePost', () => {
    it('should return the correct type and the deleted post id', () => {
      const fixture = 1;
      const expectedResult = {
        type: DELETE_POST,
        index: 1
      };

      expect(deletePost(fixture)).toEqual(expectedResult);
    });
  });

  describe('reloadPosts', () => {
    it('should return the correct type and the empty deleted post', () => {
      const expectedResult = {
        type: RELOAD_POSTS
      };

      expect(reloadPosts()).toEqual(expectedResult);
    });
  });
});
