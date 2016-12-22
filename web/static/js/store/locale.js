import { updateIntl } from 'react-intl-redux'
import * as messages from '../i18n/'

// ------------------------------------
// Constants
// ------------------------------------
export const LOCALE_CHANGE = 'LOCALE_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
// export const localeChange = createAction(LOCALE_CHANGE, (value) => value)
export const localeChangeAction = (value = 'en') => ({
  type: LOCALE_CHANGE,
  payload: value
})

export const localeChange = (value = 'en') => {
  return (dispatch) => {
    dispatch(localeChangeAction(value))
    dispatch(updateIntl({
      locale: value,
      messages: messages[value]
    }))
  }
}

export const actions = {
  localeChange
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOCALE_CHANGE]: (state, { payload }) => payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 'en'
export default function localeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
