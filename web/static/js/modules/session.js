import { push } from 'react-router-redux'
import { Socket } from 'phoenix'
import { httpGet, httpPost, httpDelete } from '../utils'

export const SESSION_ERROR = 'session/SESSION_ERROR'
export const CURRENT_USER = 'session/CURRENT_USER'
export const USER_SIGNED_OUT = 'session/USER_SIGNED_OUT'

export const currentUser = (user, socket, channel) => ({
  type: CURRENT_USER,
  payload: {
    currentUser: user,
    socket: socket,
    channel: channel
  }
})

export const setCurrentUser = (dispatch, user) => {
  const socket = new Socket('/socket', {
    params: { token: localStorage.getItem('phoenixAuthToken') },
    logger: (kind, msg, data) => {
      // console.log(`${kind}: ${msg}`, data)
    }
  })

  socket.connect()

  const channel = socket.channel(`users:${user.id}`)

  if (channel.state !== 'joined') {
    channel.join().receive('ok', () => {
      dispatch(currentUser(user, socket, channel))
    })
  }
}

export const sessionError = (error = '') => ({
  type: SESSION_ERROR,
  payload: error
})

export const userSignOut = () => ({
  type: USER_SIGNED_OUT
})

export const signIn = ({ email, password }) => {
  return (dispatch) => {
    const data = {
      session: {
        email: email,
        password: password
      }
    }

    httpPost('/api/v1/sessions', data)
    .then(({ user, jwt }) => {
      localStorage.setItem('phoenixAuthToken', jwt)
      setCurrentUser(dispatch, user)
      dispatch(push('/'))
    })
    .catch((error) => {
      error.response.json()
      .then((errorJSON) => {
        dispatch(sessionError(errorJSON))
      })
    })
  }
}

export const getCurrentUser = () => {
  return (dispatch) => {
    httpGet('/api/v1/current_user')
    .then((data) => {
      setCurrentUser(dispatch, data)
    })
    .catch((error) => {
      console.log(error)
      dispatch(push('/sign_in'))
    })
  }
}

export const signOut = () => {
  return (dispatch) => {
    httpDelete('/api/v1/sessions')
    .then(() => {
      localStorage.removeItem('phoenixAuthToken')

      dispatch(userSignOut())
      dispatch(push('/sign_in'))
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

export const signupPage = () => {
  return (dispatch) => {
    dispatch(push('/sign_up'))
  }
}

export const actions = {
  signIn,
  signOut,
  sessionError,
  getCurrentUser,
  signupPage
}

const ACTION_HANDLERS = {
  [CURRENT_USER]: (state, { payload: { currentUser, socket, channel } }) => ({
    ...state,
    currentUser: currentUser,
    socket: socket,
    channel: channel,
    error: null
  }),
  [USER_SIGNED_OUT]: (state) => initialState,
  [SESSION_ERROR]: (state, { payload: { error } }) => ({ ...state, error: error })
}

const initialState = {
  currentUser: null,
  socket: null,
  channel: null,
  error: null
}
export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
