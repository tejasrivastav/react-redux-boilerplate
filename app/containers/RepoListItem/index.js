import { connect } from 'react-redux';
import { deletePost } from 'containers/HomePage/actions';
import RepoListItem from './RepoListItem';

const mapDispatchToProps = (dispatch) => ({
  deletePost: (index) => {
    dispatch(deletePost(index));
  }
});
export default connect(null, mapDispatchToProps)(RepoListItem);
export { mapDispatchToProps };
