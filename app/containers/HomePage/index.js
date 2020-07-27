import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectPosts,
  makeSelectLoading,
  makeSelectError,
  makeSelectCategories
} from 'containers/App/selectors';
import { loadPosts } from 'containers/App/actions';

import {
  changeUsername, changeTab, reloadPosts, updateQuery
} from './actions';
import {
  makeSelectUsername, makeSelectTab, makeSelectQuery
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  loadPosts: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadPosts());
  },
  changeTab: (index) => {
    // Because the search happened on a different tab the results are not valid
    // thus clear the search before switch of the tabs
    dispatch(updateQuery(''));
    dispatch(changeTab(index));
  },
  reloadPosts: () => {
    dispatch(reloadPosts());
  },
  updateQuery: (text) => {
    dispatch(updateQuery(text));
  }
});

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  activeTab: makeSelectTab(),
  categories: makeSelectCategories(),
  query: makeSelectQuery()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
