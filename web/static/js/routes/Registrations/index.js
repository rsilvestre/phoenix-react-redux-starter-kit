import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'sign_up',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const New = require('./containers/NewContainer').default
      const reducer = require('./modules/registration').default
      injectReducer(store, { key: 'registration', reducer })
      cb(null, New)
    }, 'sign_up')
  }
})
