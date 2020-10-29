import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addComment } from '../../actions/post';

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addComment({ text }, postId);
    setText('');
  };

  return (
    <div className="post-form mt-5">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          onChange={(e) => onChange(e)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
