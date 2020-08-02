/**
 * Gets the repositories of the user from Github
 */

import {
  call, put, takeLatest, all, select, debounce
} from 'redux-saga/effects';

import { LOAD_POSTS } from 'containers/App/constants';
import { postsLoaded, postLoadingError } from 'containers/App/actions';
import { selectCategoryPosts } from 'containers/App/selectors';
import request from 'containers/HomePage/services/postRequest';
import { search } from 'containers/HomePage/services/search';
import { UPDATE_QUERY } from './constants';
import { selectQuery } from './selectors';
import { searchPerformed } from './actions';

/**
 * Posts request/response handler
 */
export function* getPosts() {
  const endpoint = '/posts';

  try {
    const repos = yield call(request, endpoint);
    yield put(postsLoaded(repos));
  } catch (err) {
    yield put(postLoadingError(err));
  }
}

export function* performSearch() {
  try {
    const query = yield select(selectQuery);
    const posts = yield select(selectCategoryPosts);
    if (query.trim().length > 0) {
      const results = yield call(search, posts, query);
      yield put(searchPerformed(results));
    } else {
      yield put(searchPerformed([]));
    }
  } catch (err) {
    console.log(err);
    // TODO: handle error
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* getData() {
  // Watches for LOAD_POSTS actions and calls getPosts when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(LOAD_POSTS, getPosts),
    debounce(200, UPDATE_QUERY, performSearch)
  ]);
}
