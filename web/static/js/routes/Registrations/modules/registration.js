import { push } from 'react-router-redux'
import { httpPost } from '../../../utils'
import { setCurrentUser } from '../../../modules/session'

export const REGISTRATION_ERROR = 'registration/REGISTRATION_ERROR'

const initialState = {
  errors: null
}

export const registrationError = (errors = []) => ({
  type: REGISTRATION_ERROR,
  payload: errors
})

export const signUp = (data) => {
  return (dispatch, getState) => {
    httpPost('/api/v1/registrations', { user: data })
    .then(({ user, jwt }) => {
      const { locale } = getState()
      localStorage.setItem('phoenixAuthToken', jwt)

      setCurrentUser(dispatch, user)
      dispatch(push(`/${locale}/home`.replace('//', '/')))
    })
    .catch((error) => {
      error.response.json()
      .then((errors) => {
        dispatch(registrationError(errors))
      })
    })
  }
}

export const actions = {
  signUp
}

const ACTION_HANDLERS = {
  [REGISTRATION_ERROR]: (state = initialState, { payload }) => ({
    ...state,
    errors: payload
  })
}

export default function registrationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
