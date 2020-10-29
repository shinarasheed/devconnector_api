import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteComment } from '../../actions/post';

const Comment = ({ comment, user, deleteComment, postId }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={`${comment.avatar}`} alt="" />
          <h4>{comment.name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          {' '}
          Posted <Moment fromNow>{comment.date}</Moment>
        </p>
        {comment !== null && comment.user === user._id ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(postId, comment._id)}
          >
            <i className="fas fa-times"></i>
          </button>
        ) : null}
      </div>
    </div>
  );
};

Comment.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
