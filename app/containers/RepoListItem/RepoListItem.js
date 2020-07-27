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

    // keep appending the markers from behind
    function Highlight(title, indexes) {
      const splice = (idx, rem, s) => (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
      function hilightAtPositions(text, posArray) {
        let startPos; let
          endPos;
        posArray = posArray.sort((a, b) => a[0] - b[0]);

        for (let i = posArray.length - 1; i >= 0; i -= 1) {
          startPos = posArray[i][0]; // eslint-disable-line prefer-destructuring
          endPos = posArray[i][1]; // eslint-disable-line prefer-destructuring
          text = splice.apply(text, [endPos, 0, '</span>']);
          text = splice.apply(text, [startPos, 0, "<span class='repo-list-item__repo-highlight'>"]);
        }
        return text;
      }
      return hilightAtPositions(title, indexes);
    }

    function renderTitle(element) {
      if (!element) {
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

RepoListItem.propTypes = {
  item: PropTypes.object,
  deletePost: PropTypes.func
};
