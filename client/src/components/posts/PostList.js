import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import Post from '../posts/Post';

const Posts = ({ getPosts, posts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      {posts !== undefined
        ? posts.map((post) => <Post key={post._id} post={post} />)
        : null}
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);
