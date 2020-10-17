import {
  CREATE_PROFILE_SUCESS,
  CREATE_PROFILE_FAILURE,
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

const getCurrentProfile = () => async (dispatch) => {
  try {
  } catch (error) {}
};
