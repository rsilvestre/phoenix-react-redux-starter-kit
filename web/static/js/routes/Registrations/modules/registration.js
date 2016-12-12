import { push } from 'react-router-redux'
import { httpPost } from '../../../utils'
import { setCurrentUser } from '../../../modules/session'

export const REGISTRATION_ERROR = 'registration/REGISTRATION_ERROR'

const initialState = {
  errors: null
}

export const registrationError = (errors) => ({
  type: REGISTRATION_ERROR,
  payload: errors
})

export const signUp = (data) => {
  return (dispatch) => {
    httpPost('/api/v1/registrations', { user: data })
    .then(({ user, jwt }) => {
      localStorage.setItem('phoenixAuthToken', jwt)

      dispatch(setCurrentUser(dispatch, user))
      dispatch(push('/'))
    })
    .catch((error) => {
      error.response.json()
      .then(({ errors }) => {
        dispatch(registrationError(errors))
      })
    })
  }
}

export const actions = {
  signUp
}

const ACTION_HANDLERS = {
  [REGISTRATION_ERROR]: (state = initialState, { errors }) => ({
    ...state,
    errors
  })
}

export default function registrationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
