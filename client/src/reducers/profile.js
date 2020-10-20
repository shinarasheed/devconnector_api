import {
  CREATE_PROFILE_SUCESS,
  CREATE_PROFILE_FAILURE,
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_EXPERIENCE,
  CREATE_EDUCATION,
  DELETE_PROFILE,
  CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case CREATE_PROFILE_SUCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_EXPERIENCE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case CREATE_EDUCATION:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case CREATE_PROFILE_FAILURE:
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case DELETE_PROFILE:
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };

    default:
      return state;
  }
}
