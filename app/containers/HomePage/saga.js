/**
 * Gets the repositories of the user from Github
 */

import {
  call, put, takeLatest, all, select
} from 'redux-saga/effects';

import { LOAD_POSTS } from 'containers/App/constants';
import { postsLoaded, postLoadingError } from 'containers/App/actions';
import { selectPosts } from 'containers/App/selectors';
import request from 'containers/HomePage/services/postRequest';
import {search} from "containers/HomePage/services/search";
import { UPDATE_QUERY } from './constants';
import { selectQuery } from './selectors';


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
    const posts = yield select(selectPosts);
    search(posts, query);
    // yield put(postsLoaded(repos));
  } catch (err) {
    // yield put(postLoadingError(err));
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
    takeLatest(UPDATE_QUERY, performSearch)
  ])
}
