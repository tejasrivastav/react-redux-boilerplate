/**
 * Tests for HomePage sagas
 */

import {
  put, takeLatest, all, debounce, select
} from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { LOAD_POSTS } from 'containers/App/constants';
import { selectCategoryPosts } from 'containers/App/selectors';
import { postsLoaded, postLoadingError } from 'containers/App/actions';
import { UPDATE_QUERY } from 'containers/HomePage/constants';
import { selectQuery } from 'containers/HomePage/selectors';

import { searchPerformed, updateQuery } from 'containers/HomePage/actions';
import getData, { getPosts, performSearch } from '../saga';


/* eslint-disable redux-saga/yield-effects */

describe('getDataSaga Saga', () => {
  const getDataSaga = getData();

  it('should start task to watch for LOAD_POSTS and UPDATE_QUERY actions', () => {
    const takeLatestDescriptor = getDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(all([
      takeLatest(LOAD_POSTS, getPosts),
      debounce(200, UPDATE_QUERY, performSearch)
    ]));
  });
});

describe('getPosts Saga', () => {
  let getPostsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getPostsGenerator = getPosts();

    const selectDescriptor = getPostsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the postsLoaded action if it requests the data successfully', () => {
    const response = [{
      name: 'First repo',
    }, {
      name: 'Second repo',
    }];
    const putDescriptor = getPostsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(postsLoaded(response)));
  });

  it('should call the postLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getPostsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(postLoadingError(response)));
  });
});

describe('Perform Search', () => {
  it('should return the indices of matched results', () => {
    const query = 'First';
    const posts = [{
      id: 1,
      title: 'First post'
    }, {
      id: 2,
      title: 'Second post'
    }];
    const response = [{ id: 1, indexes: [[0, 5]] }];

    return expectSaga(performSearch)
      .provide([
        [select(selectQuery), query],
        [select(selectCategoryPosts), posts]
      ])
      .put(searchPerformed(response))
      .dispatch(updateQuery(query))
      .run();
  });

  it('should return the empty array for empty query', () => {
    const query = '';
    const posts = [{
      id: 1,
      title: 'First post'
    }, {
      id: 2,
      title: 'Second post'
    }];
    const response = [];

    return expectSaga(performSearch)
      .provide([
        [select(selectQuery), query],
        [select(selectCategoryPosts), posts]
      ])
      .put(searchPerformed(response))
      .dispatch(updateQuery(query))
      .run();
  });
});
