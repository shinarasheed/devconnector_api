import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import dummyavatar from '../../assets/img/avatar.jpg';
import { connect } from 'react-redux';
import { deletePost, likePost, unlikePost } from '../../actions/post';

const Post = ({ post, deletePost, likePost, user }) => {
  return (
    <article>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link className="text-decoration-none" to={`/profile/${user}`}>
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
          <button
            type="button"
            className="btn btn-light"
            onClick={() => likePost(post._id)}
          >
            <i className="fas fa-thumbs-up"></i>
            <span>4</span>
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => unlikePost(post._id)}
          >
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${post._id}`} className="btn btn-primary">
            Discussion{' '}
            <span className="comment-count">{post.comments.length}</span>
          </Link>
          {user !== null && (
            <>
              {post.user === user._id && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deletePost(post._id)}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(
  Post
);
