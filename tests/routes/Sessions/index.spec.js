import SessionRoute from 'routes/Sessions'

describe('(Route) Sessions', () => {
  let _route

  beforeEach(() => {
    _route = SessionRoute({})
  })

  it('Should return a session configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `sign_in`', () => {
    expect(_route.path).to.equal('sign_in')
  })
})
