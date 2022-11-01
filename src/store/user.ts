import axios from 'axios';
import history from '../history';
import { toastr } from 'react-redux-toastr';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const ADD_ERROR = 'ADD_ERROR';

/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  error: '',
};

/**
 * ACTION CREATORS
 */
const setUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const addError = (error) => ({ type: ADD_ERROR, error });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('/api/user/me');
    dispatch(setUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, signUpName, method) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/api/user/register_login`, {
      email,
      password,
      signUpName,
      method,
    });
  } catch (authError) {
    toastr.error('', authError.response.data);
    return dispatch(addError(authError.response.data));
  }
  try {
    if (res.data) {
      dispatch(setUser(res.data));
      history.push('/');
    }
  } catch (dispatchOrHistoryErr) {
    toastr.error('', dispatchOrHistoryErr);
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/api/user/logout');
    dispatch(removeUser());
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case ADD_ERROR:
      return { ...state, error: action.error };
    case REMOVE_USER:
      return { user: {}, error: '' };
    default:
      return state;
  }
}

/**
 * SELECTORS
 */
export const getAuthError = (state) => state.user.error;
export const getUser = (state) => state.user.user;
export const getIsLoggedIn = (state) => state.user.user?._id;
