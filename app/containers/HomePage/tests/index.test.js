/**
 * Test the HomePage
 */

import React from 'react';
import { mount } from 'enzyme';

import ReposList from 'components/ReposList';
import HomePage from '../HomePage';
import { mapDispatchToProps } from '../index';
import {
  loadPosts
} from '../../App/actions';
import { changeTab, reloadPosts, updateQuery } from '../actions';

describe('<HomePage />', () => {
  it('should not render the repos list', () => {
    const mockLoadPosts = jest.fn();
    const renderedComponent = mount(
      <HomePage loading error={false} posts={[]} categories={[]} loadPosts={mockLoadPosts} />
    );
    expect(
      renderedComponent.contains(<ReposList loading error={false} posts={[]} />)
    ).toEqual(false);
  });

  it('should render the repos list', () => {
    const mockLoadPosts = jest.fn();
    const posts = [{
      id: 1,
      title: 'abc',
      category: ['thirds']
    }];
    const renderedComponent = mount(
      <HomePage loading error={false} posts={posts} categories={['thirds']} loadPosts={mockLoadPosts} />
    );
    expect(
      renderedComponent.contains(<ReposList loading error={false} list={posts} />)
    ).toEqual(true);
  });

  describe('mapDispatchToProps', () => {
    describe('loadPosts', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.loadPosts).toBeDefined();
      });

      it('should dispatch loadPosts when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.loadPosts();
        expect(dispatch).toHaveBeenCalledWith(loadPosts());
      });
    });

    describe('changeTab', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.changeTab).toBeDefined();
      });

      it('should dispatch loadPosts when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.changeTab();
        expect(dispatch).toHaveBeenCalledWith(updateQuery(''));
        expect(dispatch).toHaveBeenCalledWith(changeTab());
      });
    });

    describe('reloadPosts', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.reloadPosts).toBeDefined();
      });

      it('should dispatch loadPosts when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.reloadPosts();
        expect(dispatch).toHaveBeenCalledWith(reloadPosts());
      });
    });
  });
});
