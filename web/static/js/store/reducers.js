import { combineReducers } from 'redux'
import { intlReducer } from 'react-intl-redux'
import locationReducer from './location'
import localeReducer from './locale'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    intl: intlReducer,
    location: locationReducer,
    locale: localeReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return
  }

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
