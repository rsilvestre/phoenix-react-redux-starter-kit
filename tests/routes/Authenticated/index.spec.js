import AuthenticatedRoute from 'routes/Authenticated'

describe('(Route) Authenticated', () => {
  let _route

  beforeEach(() => {
    _route = AuthenticatedRoute({})
  })

  it('Should return a registration configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path ``', () => {
    expect(_route).not.to.have.property('path')
  })
})
