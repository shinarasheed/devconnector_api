import { CREATE_POST, POST_FAILURE, GET_POSTS } from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';

export const createPost = ({ text }) => async (dispatch) => {
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
