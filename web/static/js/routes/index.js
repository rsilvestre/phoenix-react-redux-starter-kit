// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import AuthenticatedContainer from './Authenticated'
import Registrations from './Registrations'
import Sessions from './Sessions'
import LanguageContainer from '../containers/LanguageContainer'
import Home from './Home'
import CounterRoute from './Counter'
import FunRoute from './Fun'
import Error404 from './Error404'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const smartRoutes = (store) => {
  const updateLanguage = ({ location: { pathname, search }, params }) => {
    if (!(params || {}).lang) {
      const { locale } = store.getState()

      window.history.replaceState({}, '', `/${locale}/${pathname}${search}`.replace('//', '/'))
    }
  }

  return {
    indexRoute: { onEnter: (_nextState, replace) => replace('/home') },
    onEnter: (nextState) => updateLanguage(nextState),
    onChange: (_prevState, nextState) => updateLanguage(nextState),
    childRoutes: [
      { path: 'home', ...Home },
      CounterRoute(store),
      FunRoute(store)
    ]
  }
}

export const createRoutes = (store) => ({
  component   : CoreLayout,
  childRoutes : [
    Registrations(store),
    Sessions(store),
    AuthenticatedContainer(store)
  path: '/',
  component: CoreLayout,
  childRoutes: [
    smartRoutes(store),
    {
      path: ':lang',
      component: LanguageContainer,
      childRoutes : [
        smartRoutes(store),
        { path: '*', ...Error404 }
      ]
    },
    { path: '*', ...Error404 }
  ]
})

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
