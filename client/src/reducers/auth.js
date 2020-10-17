import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case REGISTER_SUCCESS:

    default:
      return state;
  }
}
