// ------------------------------------
// Constants
// ------------------------------------
export const CONNECT_CHANNEL = 'counter/CONNECT_TO_CHANNEL'
export const SET_COUNTER = 'counter/SET_COUNTER'
export const SET_CHANNEL = 'counter/SET_CHANNEL'
export const LEAVE_CHANNEL = 'counter/LEAVE_CHANNEL'
export const COUNTER_UPDATED_VALUE = 'counter/COUNTER_UPDATED_VALUE'
export const COUNTER_ERROR = 'counter/COUNTER_ERROR'
export const COUNTER_INCREMENT = 'counter/COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'counter/COUNTER_DOUBLE_ASYNC'
export const RESET_COUNTER = 'counter/RESET_COUNTER'

// Init
const initialState = {
  counter: 0,
  channel: null
}

// ------------------------------------
// Actions
// ------------------------------------
export const channelConnection = () => ({
  type: CONNECT_CHANNEL
})

export const setCounter = (counter) => ({
  type: SET_COUNTER,
  payload: counter
})

export const setChannel = (channel) => ({
  type: SET_CHANNEL,
  payload: channel
})

export const channelLeft = () => ({
  type: LEAVE_CHANNEL
})

export const updateCounter = (value) => ({
  type: COUNTER_UPDATED_VALUE,
  payload: value
})

export const reset = () => ({
  type: RESET_COUNTER
})

export const connectToChannel = (socket) => {
  return (dispatch, getState) => {
    const { counter: { channel: chan }, session } = getState()
    if (!socket || chan) {
      return false
    }

    const channel = socket.channel('counter:' + session.currentUser.id)
    dispatch(channelConnection())

    channel.join().receive('ok', (response) => {
      dispatch(setCounter(response.counter))
      dispatch(setChannel(channel))
    }).receive('error', (error) => {
      console.log(error)
    })

    channel.on('counter:updated', ({ value }) => {
      dispatch(updateCounter(value))
    })

    channel.on('counter_state', ({ counter: value = 0 }) => {
      dispatch(updateCounter(value))
    })
  }
}

export const leaveChannel = () => {
  return (dispatch) => {
    dispatch(channelLeft())
  }
}

export const counterError = (error) => ({
  type: COUNTER_ERROR,
  payload: error
})

export const counterIncrement = (value = 1) => ({
  type: COUNTER_INCREMENT,
  payload: value
})

export const counterDouble = (value) => ({
  type: COUNTER_DOUBLE_ASYNC,
  payload: value
})

const pushState = (dispatch, channel, value) => {
  channel.push('counter:updated', { value: value })
    .receive('error', (data) => {
      dispatch(counterError(data.error))
    })
}

export const increment = (value = 1) => {
  return (dispatch, getState) => {
    const { counter: { counter, channel } } = getState()
    dispatch(counterIncrement(value))
    pushState(dispatch, channel, (counter + value))
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!
*/

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { counter: { counter, channel } } = getState()
        dispatch(counterDouble(counter))
        pushState(dispatch, channel, (counter * 2))
        resolve()
      }, 200)
    })
  }
}

export const resetCounter = () => {
  return (dispatch, getState) => {
    const { counter: { channel } } = getState()
    dispatch(reset())
    channel.push('counter:reset', {})
      .receive('error', (data) => {
        dispatch(counterError(data.error))
      })
  }
}

export const actions = {
  connectToChannel,
  leaveChannel,
  increment,
  doubleAsync,
  resetCounter
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_CHANNEL]: (state, { payload }) => ({ ...state, channel: payload }),
  [COUNTER_UPDATED_VALUE]: (state, { payload }) => ({ ...state, counter: payload }),
  [COUNTER_INCREMENT]: (state, { payload }) => ({ ...state, counter: state.counter + payload }),
  [COUNTER_DOUBLE_ASYNC]: (state, { payload }) => ({ ...state, counter: payload * 2 }),
  [RESET_COUNTER]: (state) => ({ ...state, counter: 0 }),
  [LEAVE_CHANNEL]: (state) => ({ ...state, channel: null })
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
