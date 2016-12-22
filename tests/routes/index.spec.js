import MainRoute from 'routes/index'

describe('(Route) index', () => {
  let _route

  beforeEach(() => {
    _route = MainRoute({})
  })

  it('Should return a session configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `main`', () => {
    expect(_route.path).to.equal('/')
  })
})
