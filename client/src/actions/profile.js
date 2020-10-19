import {
  CREATE_PROFILE_SUCESS,
  CREATE_PROFILE_FAILURE,
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_EXPERIENCE,
  CREATE_EDUCATION,
} from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';

export const createProfile = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);
    const response = await axios.post('/api/v1/profile', body, config);

    dispatch({
      type: CREATE_PROFILE_SUCESS,
      payload: response.data.data,
    });
    dispatch(setAlert('profile created successfully', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    const error = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    } else if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: CREATE_PROFILE_FAILURE,
    });
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/v1/profile');
    dispatch({
      type: GET_PROFILE,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);
    const response = await axios.post(
      'api/v1/profile/experience',
      body,
      config
    );

    dispatch({
      type: CREATE_EXPERIENCE,
      payload: response.data.data,
    });
    dispatch(setAlert('experience added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    const error = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    } else if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);
    const response = await axios.post('api/v1/profile/education', body, config);

    dispatch({
      type: CREATE_EDUCATION,
      payload: response.data.data,
    });
    dispatch(setAlert('education added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    const error = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    } else if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
