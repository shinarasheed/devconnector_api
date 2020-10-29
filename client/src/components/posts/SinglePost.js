import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import dummyavatar from '../../assets/img/avatar.jpg';
import { getPost } from '../../actions/post';
import PropTypes from 'prop-types';
import Spinner from '../Layouts/Spinner';
import CommentForm from './CommentForm';
import Comments from './Comments';

const SinglePost = ({ getPost, match, post, likes, loading, comments }) => {
  useEffect(() => {
    getPost(match.params.postId);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <article className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link className="text-decoration-none" to={`/`}>
            <img
              className="round-img"
              src={post.avatar !== '' ? post.avatar : dummyavatar}
            />
            <h4
              className="text-capitalize font-italic"
              style={{ fontSize: '15px' }}
            >
              {post.name}
            </h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
          <p className="post-date">
            Posted <Moment fromNow>{post.date}</Moment>
          </p>
        </div>
      </div>
      <CommentForm postId={match.params.postId} />
      <Comments comments={comments} postId={match.params.postId} />
    </article>
  );
};

SinglePost.propTypes = {
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  comments: state.post.comments,
  loading: state.post.loading,
});
export default connect(mapStateToProps, { getPost })(SinglePost);
