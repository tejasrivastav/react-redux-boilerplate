import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import differenceBy from 'lodash/differenceBy';
import find from 'lodash/find';

import { selectQuery } from 'containers/HomePage/selectors';
import { initialState } from './reducer';

const selectGlobal = (state) => state.global || initialState;

const selectRoute = (state) => state.router;

const selectPosts = (state) => state.global.posts;

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.currentUser
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);

const selectCategory = (state) => state.global.categoriesName[state.home.activeIndex];

const selectDeletedPostIds = (state) => state.home.deletedPosts;

const selectSearchResults = (state) => state.home.searchResults;

const selectCategoryPosts = createSelector(
  selectPosts,
  selectCategory,
  (posts, category) => filter(
    posts,
    (post) => (post.category ? includes(post.category, category) : false)
  )
);

const makeSelectPosts = () => createSelector(
  selectCategoryPosts,
  selectDeletedPostIds,
  selectSearchResults,
  selectQuery,
  (posts, deletedPostIds, searchResults, query) => {
    if (query.length > 0 && searchResults.length === 0) {
      return [];
    }
    let filteredPosts = posts;
    if (searchResults.length > 0) {
      filteredPosts = searchResults.map((result) => {
        const post = find(posts, ['id', result.id]);
        return Object.assign({}, post, result);
      });
    }
    deletedPostIds = deletedPostIds.map((postid) => ({ id: postid }));
    return differenceBy(filteredPosts, deletedPostIds, 'id');
  }
);

const makeSelectCategories = () => createSelector(
  selectGlobal,
  (globalState) => globalState.categoriesName
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.location
);

export {
  selectGlobal,
  selectPosts,
  selectCategoryPosts,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectPosts,
  makeSelectCategories,
  makeSelectLocation,
};
