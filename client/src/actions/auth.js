import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';

export const registerUser = ({ name, email, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });
    const response = await axios.post('/api/v1/auth/signup', body, config);
    console.log(response);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
