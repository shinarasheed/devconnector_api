import React from 'react';
import Comment from './Comment';

const Comments = ({ comments, postId }) => {
  return comments.length > 0 ? (
    <>
      {comments.map((comment) => (
        <Comment postId={postId} key={comment._id} comment={comment} />
      ))}
    </>
  ) : null;
};

export default Comments;
