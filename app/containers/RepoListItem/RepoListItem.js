/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import { DeleteIcon } from 'components/Icons';
import './style.scss';

export default class RepoListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { item, deletePost } = this.props;

    function deletePostHandler(evt) {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      deletePost(item.id);
    }

    const handleKeyDown = (evt) => {
      if (evt.key === 'Enter') {
        deletePostHandler(evt);
      }
    };
    // Put together the content of the repository
    const content = (
      <div className="repo-list-item">
        <div className="repo-list-item__repo-link">
          <span>{item.title}</span>
        </div>
        <a
          role="button"
          className="repo-list-item__del-link"
          onClick={deletePostHandler}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <DeleteIcon className="repo-list-item__del-icon" />
        </a>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.id}`} item={content} />
    );
  }
}

RepoListItem.propTypes = {
  item: PropTypes.object,
  deletePost: PropTypes.func
};
