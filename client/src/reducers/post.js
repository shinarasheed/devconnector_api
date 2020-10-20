import { CREATE_POST, POST_FAILURE, GET_POSTS } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case POST_FAILURE:
      return {
        ...state,
        post: null,
        loading: true,
      };

    default:
      return state;
  }
}
