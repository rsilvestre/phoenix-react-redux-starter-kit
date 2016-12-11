import { push } from 'react-router-redux'
import { httpPost } from '../../../utils'
import { sessionError } from '../../../modules/session'

export const CURRENT_USER = 'registration/CURRENT_USER'

const initialState = {
  errors: null
}

export const receiveUser = ({user}) => ({
  type: CURRENT_USER,
  payload: user
})

export const signUp = (data) => {
  return (dispatch) => {
    httpPost('/api/v1/registrations', {user: data})
    .then((data) => {
      localStorage.setItem('phoenixAuthToken', data.jwt)

      dispatch(receiveUser(data))
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

export const actions = {
  receiveUser,
  signUp
}

const ACTION_HANDLERS = {
  [CURRENT_USER]: (state = initialState, { payload: errors }) => ({
    ...state,
    errors: errors
  })
}

export default function registrationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
