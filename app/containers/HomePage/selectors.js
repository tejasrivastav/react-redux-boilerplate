import { createSelector } from 'reselect';

const selectHome = (state) => state.home;

const selectQuery = (state) => state.home.query;

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.username
);

const makeSelectTab = () => createSelector(
  selectHome,
  (homeState) => homeState.activeIndex
);

const makeSelectQuery = () => createSelector(
  selectHome,
  (homeState) => homeState.query
);

const makeSelectSearchResults = () => createSelector(
  selectHome,
  (homeState) => homeState.searchResults
);

export {
  selectHome,
  selectQuery,
  makeSelectUsername,
  makeSelectTab,
  makeSelectQuery,
  makeSelectSearchResults
};
