// ------------------------------------
// Constants
// ------------------------------------
export const FIELD_DATA = 'fun/FIELD_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export const updateField = (value = '') => ({
  type: FIELD_DATA,
  payload: value
})

export const actions = {
  updateField
}

const ACTION_HANDLERS = {
  [FIELD_DATA]: (state, action) => action.payload
}

const initialState = ''
export default function funReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
