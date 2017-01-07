// We only need to import the modules necessary for initial render
import AuthContainer from '../../containers/AuthContainer'
import { getCurrentUser } from '../../modules/session'
import Home from './Home'
import CounterRoute from './Counter'
import FunRoute from './Fun'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => {
  const _ensureAuthenticated = (_nextState, replace, next) => {
    const { dispatch } = store
    const { locale, session: { bRequest, currentUser } } = store.getState()
    const phoenixAuthToken = localStorage.getItem('phoenixAuthToken')

    if (bRequest) {
      return setTimeout(() => _ensureAuthenticated(_nextState, replace, next), 50)
    }

    if (!currentUser && phoenixAuthToken) {
      dispatch(getCurrentUser())
    } else if (!phoenixAuthToken) {
      replace(`/${locale}/sign_in`.replace('//', '/'))
    }

    next()
  }

  return {
    component: AuthContainer,
    onEnter: _ensureAuthenticated,
    indexRoute: {
      onEnter: (_nextState, replace) => {
        const { locale } = store.getState()
        replace(`/${locale}/home`.replace('//', '/'))
      }
    },
    childRoutes: [
      { path: 'home', ...Home },
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
