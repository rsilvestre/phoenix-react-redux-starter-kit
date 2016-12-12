import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'fun',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Fun = require('./containers/FunContainer').default
      const reducer = require('./modules/fun').default
      injectReducer(store, { key: 'fun', reducer })
      cb(null, Fun)
    }, 'fun')
  }
})
