import { updateIntl } from 'react-intl-redux'
import * as messages from '../i18n/'

// ------------------------------------
// Constants application
// ------------------------------------
export const SUPPORTED_LANGUAGE = '(en|fr|es)'
export const LANGUAGE_STORAGE_NAME = 'phoenix-react-redux:language'

// ------------------------------------
// Constants reducer
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
    localStorage.setItem(LANGUAGE_STORAGE_NAME, value)
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
const initialState = localStorage.getItem(LANGUAGE_STORAGE_NAME) || 'en'
export default function localeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
