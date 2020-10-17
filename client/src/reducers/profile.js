import {
  CREATE_PROFILE_SUCESS,
  CREATE_PROFILE_FAILURE,
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
        profile: payload,
      };

    case CREATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
