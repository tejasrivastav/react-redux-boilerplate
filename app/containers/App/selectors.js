import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

import { initialState } from './reducer';

const selectGlobal = (state) => state.global || initialState;

const selectRoute = (state) => state.router;

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

const makeSelectPosts = () => createSelector(
  selectGlobal,
  selectCategory,
  (globalState, category) => filter(
    globalState.posts,
    (post) => (post.category ? includes(post.category, category) : false)
  )
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
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectPosts,
  makeSelectCategories,
  makeSelectLocation,
};
