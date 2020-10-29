import {
  CREATE_POST,
  POST_FAILURE,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  LIKE_POST,
  UNLIKE_POST,
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  likes: [],
  comments: [],
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

    case GET_POST:
      return {
        ...state,
        post: payload,
        comments: payload.comments,
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: payload,
      };

    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== payload),
      };

    case LIKE_POST:
      return {
        ...state,
        likes: state.post.likes.unshift(payload),
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
