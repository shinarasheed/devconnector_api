import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_PROFILE,
} from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthtoken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthtoken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth');
    dispatch({
      type: LOAD_USER,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerUser = ({ name, email, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });
    const response = await axios.post('/api/v1/auth/signup', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    const error = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    } else if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loginUser = ({ email, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });
    const response = await axios.post('/api/v1/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOG_OUT,
  });
};
