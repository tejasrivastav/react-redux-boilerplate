import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import differenceBy from 'lodash/differenceBy';
import find from 'lodash/find';

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
  (posts, category) => {
    return filter(
      posts,
      (post) => (post.category ? includes(post.category, category) : false)
    );
  }
);

const makeSelectPosts = () => createSelector(
  selectCategoryPosts,
  selectDeletedPostIds,
  selectSearchResults,
  (posts, deletedPostIds, searchResults) => {
    try {
      let filteredPosts = posts;
    if(searchResults.length > 0 )
      filteredPosts = searchResults.map((result)=>{
        let post = find(posts, ["id", result.id]);
        return post;
      });
    deletedPostIds = deletedPostIds.map((postid) => ({ id: postid }));
    return differenceBy(filteredPosts, deletedPostIds, 'id');
    } catch(e) {
      return []
    }
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
