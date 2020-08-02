import { shallow, mount } from 'enzyme';
import React from 'react';

import PostListItem from 'containers/PostListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import PostsList from '../index';

describe('<PostsList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(<PostsList loading />);
    expect(
      renderedComponent.contains(<List component={LoadingIndicator} />)
    ).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <PostsList loading={false} error={{ message: 'Loading failed!' }} />
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render the repositories if loading was successful', () => {
    const posts = [
      {
        id: 1,
        title: 'Abc'
      }
    ];
    const renderedComponent = shallow(
      <PostsList list={posts} error={false} />
    );

    expect(
      renderedComponent.contains(
        <List items={posts} component={PostListItem} />
      )
    ).toEqual(true);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <PostsList list={false} error={false} loading={false} />
    );

    expect(renderedComponent.html()).toEqual(null);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const emptyList = [];
    const renderedComponent = mount(
      <PostsList list={emptyList} error={false} loading={false} />
    );
    expect(renderedComponent.text()).toMatch(/No results to show/);
  });
});
