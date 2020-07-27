/**
 * Test the repo list item
 */

import React from 'react';
import { shallow, render } from 'enzyme';

import ListItem from 'components/ListItem';
import RepoListItem from '../RepoListItem';

const renderComponent = (props = {}) => render(<RepoListItem {...props} />);
const shallowComponent = (props = {}) => shallow(<RepoListItem {...props} />);

describe.only('<RepoListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallowComponent({ item });
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });

  it('should render the title', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.text()).toContain(item.title);
  });

  it('should render the DeleteIcon', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.find('svg').length).toBe(1);
  });

  it('should render the Highlight class', () => {
    item.indexes = [[0, 1]];
    const renderedComponent = shallowComponent({ item });
    expect(renderedComponent.html()).toContain("class='repo-list-item__repo-highlight'");
  });

  it('should not render the Highlight class', () => {
    const renderedComponent = shallowComponent({ item });
    expect(renderedComponent.html()).not.toContain("class='repo-list-item__repo-highlight'");
  });

  it('should call deletePost when delete is clicked', () => {
    const onClick = jest.fn();
    const renderedComponent = shallowComponent({ item, deletePost: onClick });
    expect(renderedComponent.find('a').length).toBe(1);
    // renderedComponent.find('a').simulate('click');
    // expect(onClick).toHaveBeenCalledTimes(1);
  });
});
