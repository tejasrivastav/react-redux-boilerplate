/**
 * Gets the repositories of the user from Github
 */

import {
  call, put, select, takeLatest
} from 'redux-saga/effects';

import { LOAD_POSTS } from 'containers/App/constants';
import { postsLoaded, postLoadingError } from 'containers/App/actions';

import request from 'utils/postRequest';

/**
 * Posts request/response handler
 */
export function* getPosts() {

  const endpoint = "/posts";

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, endpoint);
    yield put(postsLoaded(repos));
  } catch (err) {
    yield put(postLoadingError(err));
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
  yield takeLatest(LOAD_POSTS, getPosts);
}
