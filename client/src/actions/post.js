import {
  CREATE_POST,
  POST_FAILURE,
  GET_POSTS,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  LIKE_POST,
  UNLIKE_POST,
} from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';

export const createPost = ({ text }, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ text });
    const response = await axios.post('/api/v1/post', body, config);

    dispatch({
      type: CREATE_POST,
      payload: response.data.data,
    });
    dispatch(setAlert('post created', 'success'));
    setTimeout(() => {
      history.push('/posts');
    }, 4000);
  } catch (err) {
    const errors = err.response.data.errors;
    const error = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    } else if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: POST_FAILURE,
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/v1/post');

    dispatch({
      type: GET_POSTS,
      payload: response.data.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    const error = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    } else if (error) {
      dispatch(setAlert(error, 'danger'));
    }

    dispatch({
      type: POST_FAILURE,
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/post/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: POST_FAILURE,
    });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v1/post/${postId}`);
    dispatch({
      type: GET_POST,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: POST_FAILURE,
    });
  }
};

export const addComment = ({ text }, postId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ text });
  try {
    const response = await axios.post(
      `/api/v1/post/${postId}/comment`,
      body,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: POST_FAILURE,
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/post/${postId}/comment/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: POST_FAILURE,
    });
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/v1/post/${postId}/like/`);
    console.log(response.data.data);
    dispatch({
      type: LIKE_POST,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: POST_FAILURE,
    });
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  try {
    await axios.post(`/api/v1/post/${postId}/unlike/`);
    dispatch({
      type: UNLIKE_POST,
      payload: postId,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: POST_FAILURE,
    });
  }
};
