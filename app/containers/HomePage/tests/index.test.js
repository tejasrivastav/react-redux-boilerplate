/**
 * Test the HomePage
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import ReposList from 'components/ReposList';
import HomePage from '../HomePage';
import { mapDispatchToProps } from '../index';
import { changeUsername } from '../actions';
import { loadPosts } from '../../App/actions';

describe('<HomePage />', () => {
  it('should render the repos list', () => {
    const renderedComponent = shallow(
      <HomePage loading error={false} repos={[]} />
    );
    expect(
      renderedComponent.contains(<ReposList loading error={false} repos={[]} />)
    ).toEqual(true);
  });

  it('should render fetch the repos on mount if a username exists', () => {
    const submitSpy = jest.fn();
    mount(
      <HomePage
        username="Not Empty"
        onChangeUsername={() => {}}
        loadPosts={submitSpy}
      />
    );
    expect(submitSpy).toHaveBeenCalled();
  });


  it('should not call loadPosts if username is null', () => {
    const submitSpy = jest.fn();
    mount(
      <HomePage
        username=""
        onChangeUsername={() => {}}
        loadPosts={submitSpy}
      />
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUsername).toBeDefined();
      });

      it('should dispatch changeUsername when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const username = 'flexdinesh';
        result.onChangeUsername({ target: { value: username } });
        expect(dispatch).toHaveBeenCalledWith(changeUsername(username));
      });
    });

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

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        result.loadPosts();
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });
  });
});
