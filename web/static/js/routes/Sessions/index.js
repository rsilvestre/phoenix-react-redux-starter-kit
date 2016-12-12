export default (store) => ({
  path: '/sign_in',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const New = require('./containers/NewContainer').default
      cb(null, New)
    }, 'sign_in')
  }
})
