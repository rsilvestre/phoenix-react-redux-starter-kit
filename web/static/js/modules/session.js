import { push } from 'react-router-redux'
import { Socket, Presence } from 'phoenix'
import { httpGet, httpPost, httpDelete } from '../utils'

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString()
  }
}

const listBy = (user, { metas }) => {
  return {
    user,
    size: metas.length,
    values: metas.map(({ online_at: value }) => formatTimestamp(value))
  }
}

export const SESSION_ERROR = 'session/SESSION_ERROR'
export const CURRENT_USER = 'session/CURRENT_USER'
export const USER_SIGNED_OUT = 'session/USER_SIGNED_OUT'
export const UPDATE_PRESENCES = 'session/UPDATE_PRESENCES'
export const SEND_REQUEST = 'session/SEND_REQUEST'
export const GET_RESPONSE = 'session/GET_RESPONSE'

export const currentUser = (currentUser, socket, userChannel, interfaceChannel) => ({
  type: CURRENT_USER,
  payload: {
    currentUser,
    socket,
    userChannel,
    interfaceChannel
  }
})

export const updatePresences = (presences) => ({
  type: UPDATE_PRESENCES,
  payload: presences
})

export const setCurrentUser = (dispatch, user) => {
  const socket = new Socket('/socket', {
    params: { token: localStorage.getItem('phoenixAuthToken') },
    logger: (kind, msg, data) => {
      // console.log(`${kind}: ${msg}`, data)
    }
  })

  socket.connect()

  const userChannel = socket.channel(`users:${user.id}`)

  if (userChannel.state !== 'joined') {
    userChannel.join().receive('ok', () => {
      const interfaceChannel = socket.channel(`interface:${user.id}`)

      if (interfaceChannel.state !== 'joined') {
        interfaceChannel.join().receive('ok', () => {
          let presences = {}

          dispatch(currentUser(user, socket, userChannel, interfaceChannel))

          interfaceChannel.on('presence_state', state => {
            presences = Presence.syncState(presences, state)
            dispatch(updatePresences(Presence.list(presences, listBy)))
          })

          interfaceChannel.on('presence_diff', diff => {
            presences = Presence.syncDiff(presences, diff)
            dispatch(updatePresences(Presence.list(presences, listBy)))
          })

          dispatch(getResponse())
        })
      }
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

export const sendRequest = () => ({
  type: SEND_REQUEST
})

export const getResponse = () => ({
  type: GET_RESPONSE
})

export const signIn = ({ email, password }) => {
  return (dispatch) => {
    const data = {
      session: {
        email: email,
        password: password
      }
    }

    dispatch(sendRequest())

    httpPost('/api/v1/sessions', data)
    .then(({ user, jwt }) => {
      localStorage.setItem('phoenixAuthToken', jwt)
      setCurrentUser(dispatch, user)
      dispatch(push('/'))
    })
    .catch((error) => {
      dispatch(getResponse())

      error.response.json()
      .then((errorJSON) => {
        dispatch(sessionError(errorJSON))
      })
    })
  }
}

export const getCurrentUser = () => {
  return (dispatch) => {
    dispatch(sendRequest())

    httpGet('/api/v1/current_user')
    .then((data) => {
      setCurrentUser(dispatch, data)
    })
    .catch((error) => {
      dispatch(getResponse())

      console.log(error)
      dispatch(push('/sign_in'))
    })
  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    dispatch(sendRequest())

    httpDelete('/api/v1/sessions')
    .then(() => {
      const { session: { userChannel, interfaceChannel } } = getState()

      dispatch(getResponse())

      localStorage.removeItem('phoenixAuthToken')

      userChannel.leave()
      interfaceChannel.leave()

      dispatch(userSignOut())
      dispatch(push('/sign_in'))
    })
    .catch((error) => {
      dispatch(getResponse())
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
  [CURRENT_USER]: (state, { payload: { currentUser, socket, userChannel, interfaceChannel } }) => ({
    ...state,
    currentUser,
    socket,
    userChannel,
    interfaceChannel,
    presences: [],
    error: null
  }),
  [USER_SIGNED_OUT]: (state) => initialState,
  [UPDATE_PRESENCES]: (state, { payload: presences }) => ({
    ...state,
    presences: presences
  }),
  [SEND_REQUEST]: (state) => ({ ...state, bRequest: true }),
  [GET_RESPONSE]: (state) => ({ ...state, bRequest: false }),
  [SESSION_ERROR]: (state, { payload: { error } }) => ({
    ...state,
    error: error
  })
}

const initialState = {
  bRequest: false,
  currentUser: null,
  socket: null,
  userChannel: null,
  interfaceChannel: null,
  presences: [],
  error: null
}
export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
