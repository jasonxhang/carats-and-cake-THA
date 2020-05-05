import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch, getState) => {
  console.log(1)
  try {
    console.log(2)
    const currState = getState()
    console.log('currState:', currState)
    console.log('currState user token:', currState.user.token)

    const res = await axios.get('http://localhost:5000/api/user/me', {
      headers: {
        'Content-Type': 'application/json',
        'token': currState.user.token
      }
    })
    console.log('response!!', res)

    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, signUpName, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`http://localhost:5000/api/user/${method}`, { signUpName, email, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    console.log('logout?')
    await axios.post('http://localhost:5000/api/user/logout')
    dispatch(removeUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
