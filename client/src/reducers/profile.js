import {
  CREATE_PROFILE_SUCESS,
  CREATE_PROFILE_FAILURE,
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_EXPERIENCE,
  CREATE_EDUCATION,
} from '../actions/types';

const initialState = {
  profile: null,
  education: null,
  experience: null,
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
        experience: payload,
        loading: false,
      };

    case CREATE_EDUCATION:
      return {
        ...state,
        education: payload,
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

    default:
      return state;
  }
}
