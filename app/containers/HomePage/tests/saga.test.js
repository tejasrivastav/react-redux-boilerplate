/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_POSTS } from 'containers/App/constants';
import { postsLoaded, postLoadingError } from 'containers/App/actions';

import getData, { getPosts } from '../saga';

const username = 'flexdinesh';

/* eslint-disable redux-saga/yield-effects */
describe('getPosts Saga', () => {
  let getPostsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getPostsGenerator = getPosts();

    const selectDescriptor = getPostsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getPostsGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the postsLoaded action if it requests the data successfully', () => {
    const response = [{
      name: 'First repo',
    }, {
      name: 'Second repo',
    }];
    const putDescriptor = getPostsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(postsLoaded(response, username)));
  });

  it('should call the postLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getPostsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(postLoadingError(response)));
  });
});

describe('getDataSaga Saga', () => {
  const getDataSaga = getData();

  it('should start task to watch for LOAD_POSTS action', () => {
    const takeLatestDescriptor = getDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_POSTS, getPosts));
  });
});
