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

    // transform this to array of elements to void dangerously set html
    function HighlightTag(title, indexes) {
      const splice = function (idx, rem, s) {
        return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
      };
      function hilightAtPositions(text, posArray) {
        let startPos; let
          endPos;
        posArray = posArray.sort((a, b) => a[0] - b[0]);

        for (let i = posArray.length - 1; i >= 0; i--) {
          startPos = posArray[i][0];
          endPos = posArray[i][1];
          text = splice.apply(text, [endPos, 0, '</span>']);
          text = splice.apply(text, [startPos, 0, "<span class='repo-list-item__repo-highlight'>"]);
        }
        return text;
      }
      return hilightAtPositions(title, indexes);
      // title.substring(0, index) + "<span class='highlight'>" + title.substring(index, index + text.length) + "</span>" + title.substring(index + text.length);
    }
    // Put together the content of the repository
    const content = (
      <div className="repo-list-item">
        <div className="repo-list-item__repo-link">
          <span>{item.indexes ? <span dangerouslySetInnerHTML={{ __html: HighlightTag(item.title, item.indexes) }}></span> : item.title}</span>
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
