/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_USERNAME, CHANGE_TAB, DELETE_POST, RELOAD_POSTS, UPDATE_QUERY, SEARCH_PERFORMED
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name
  };
}

export function changeTab(index) {
  return {
    type: CHANGE_TAB,
    index
  };
}

export function deletePost(index) {
  return {
    type: DELETE_POST,
    index
  };
}

export function reloadPosts() {
  return {
    type: RELOAD_POSTS
  };
}

export function updateQuery(text) {
  return {
    type: UPDATE_QUERY,
    text
  };
}

export function searchPerformed(results) {
  return {
    type: SEARCH_PERFORMED,
    results
  }
}
