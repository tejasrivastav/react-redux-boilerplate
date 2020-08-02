/**
 * PostListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import { DeleteIcon } from 'components/Icons';
import './style.scss';

export default class PostListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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

    // keep appending the markers in reverse order
    function Highlight(text, indexes) {
      function splice(idx, rem, s) {
        return this.slice(0, idx) + s + this.slice(idx + Math.abs(rem));
      }
      let startPos; let endPos;
      indexes = indexes.sort((a, b) => a[0] - b[0]);

      for (let i = indexes.length - 1; i >= 0; i -= 1) {
        startPos = indexes[i][0]; // eslint-disable-line prefer-destructuring
        endPos = indexes[i][1]; // eslint-disable-line prefer-destructuring
        text = splice.call(text, endPos, 0, '</span>');
        text = splice.call(text, startPos, 0, "<span class='repo-list-item__repo-highlight'>");
      }
      return text;
    }

    function renderTitle(element) {
      if (!element && !element.title) {
        return '';
      } if (!element.indexes) {
        return element.title;
      }
      return <span dangerouslySetInnerHTML={{ __html: Highlight(element.title, element.indexes) }}></span>;
    }

    const content = (
      <div className="repo-list-item">
        <div className="repo-list-item__repo-link">
          <span>{renderTitle(item)}</span>
        </div>
        <a
          role="button"
          id="repo-list-item__del-link"
          className="repo-list-item__del-link"
          onClick={deletePostHandler}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <DeleteIcon className="repo-list-item__del-icon" />
        </a>
      </div>
    );

    return (
      <ListItem key={`repo-list-item-${item.id}`} item={content} />
    );
  }
}

PostListItem.propTypes = {
  item: PropTypes.object,
  deletePost: PropTypes.func
};
