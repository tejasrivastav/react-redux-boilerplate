import { connect } from 'react-redux';
import { deletePost } from 'containers/HomePage/actions';
import PostListItem from './PostListItem';

const mapDispatchToProps = (dispatch) => ({
  deletePost: (index) => {
    dispatch(deletePost(index));
  }
});
export default connect(null, mapDispatchToProps)(PostListItem);
export { mapDispatchToProps };
