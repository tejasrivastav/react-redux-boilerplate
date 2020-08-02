import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import PostListItem from 'containers/PostListItem';

const PostsList = ({ loading, error, list }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (list !== false) {
    return <List items={list} component={PostListItem} />;
  }

  return null;
};

PostsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  list: PropTypes.any
};

export default PostsList;
