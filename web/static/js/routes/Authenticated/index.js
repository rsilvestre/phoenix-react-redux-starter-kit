// We only need to import the modules necessary for initial render
import AuthContainer from '../../containers/AuthContainer'
import { getCurrentUser } from '../../modules/session'
import Home from './Home'
import CounterRoute from './Counter'
import FunRoute from './Fun'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => {
  const _ensureAuthenticated = (nextState, replace, callback) => {
    const { dispatch } = store
    const { session: { currentUser } } = store.getState()
    const phoenixAuthToken = localStorage.getItem('phoenixAuthToken')

    if (!currentUser && phoenixAuthToken) {
      dispatch(getCurrentUser())
    } else if (!phoenixAuthToken) {
      replace('/sign_in')
    }

    callback()
  }

  return {
    path: '/',
    component: AuthContainer,
    onEnter: _ensureAuthenticated,
    indexRoute: Home,
    childRoutes: [
      CounterRoute(store),
      FunRoute(store)
    ]
  }
}

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
