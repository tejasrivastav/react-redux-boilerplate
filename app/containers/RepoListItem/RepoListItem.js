/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import { IssueIcon } from 'components/Icons';
import './style.scss';

export default class RepoListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { item } = this.props;
    let nameprefix = '';

    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    // if (item.owner.login !== currentUser) {
    //   nameprefix = `${item.owner.login}/`;
    // }

    // Put together the content of the repository
    const content = (
      <div className="repo-list-item">
        <div className="repo-list-item__repo-link">
          <span className="repo-list-item__repo-link-cat">{item.category ? item.category[0]: ""}</span>
          <span>{item.title}</span>
        </div>
        <a className="repo-list-item__issue-link">
          <IssueIcon className="repo-list-item__issue-icon" />
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
  currentUser: PropTypes.string,
};
