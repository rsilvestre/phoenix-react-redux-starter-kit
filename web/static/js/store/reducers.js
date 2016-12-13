import { combineReducers } from 'redux'
import { intlReducer } from 'react-intl-redux'
import locationReducer from './location'
import localeReducer from './locale'
import sessionReducer from '../modules/session'
import { routerReducer } from 'react-router-redux'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    intl: intlReducer,
    location: locationReducer,
    locale: localeReducer,
    session: sessionReducer,
    routing: routerReducer,
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
