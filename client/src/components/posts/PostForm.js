import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';

const PostForm = ({ createPost, history }) => {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createPost({ text }, history);
    setText('');
  };

  return (
    <section className="container">
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={onSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={text}
            onChange={(e) => onChange(e)}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </section>
  );
};

export default connect(null, { createPost })(PostForm);
