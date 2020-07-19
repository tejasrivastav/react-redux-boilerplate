import { createSelector } from 'reselect';

const selectHome = (state) => state.home;

const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.username
);

const makeSelectTab = () => createSelector(
  selectHome,
  (homeState) => homeState.activeIndex
);

export {
  selectHome,
  makeSelectUsername,
  makeSelectTab
};
