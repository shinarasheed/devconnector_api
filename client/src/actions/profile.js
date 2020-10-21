import {
  CREATE_PROFILE_SUCESS,
  CREATE_PROFILE_FAILURE,
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_EXPERIENCE,
  CREATE_EDUCATION,
  GET_PROFILES,
  DELETE_PROFILE,
  CLEAR_PROFILE,
} from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
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
    dispatch(setAlert(edit ? 'profile updated' : 'profile created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
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

export const deleteExperience = (experienceId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `/api/v1/profile/experience/${experienceId}`
    );

    //this is the way this will work based on the way we structured our data
    dispatch({
      type: GET_PROFILE,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEducation = (educationId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `/api/v1/profile/education/${educationId}`
    );

    dispatch({
      type: GET_PROFILE,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfile = () => async (dispatch) => {
  if (window.confirm('are you sure?')) {
    try {
      await axios.delete(`/api/v1/profile`);

      dispatch({
        type: DELETE_PROFILE,
      });
      dispatch({
        type: CLEAR_PROFILE,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v1/profile/all`);

    console.log(response.data.data);

    dispatch({
      type: GET_PROFILES,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
    });
    console.log(error);
  }
};
