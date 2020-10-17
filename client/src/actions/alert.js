import { SHOW_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, type, timeout = 3000) => (dispatch) => {
  const id = uuidv4();
  const alert = {
    id,
    msg,
    type,
    timeout,
  };
  dispatch({
    type: SHOW_ALERT,
    payload: alert,
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, timeout);
};
