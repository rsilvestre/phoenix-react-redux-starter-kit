import RegistrationsRoute from 'routes/Registrations'

describe('(Route) Registration', () => {
  let _route

  beforeEach(() => {
    _route = RegistrationsRoute({})
  })

  it('Should return a registration configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `registration`', () => {
    expect(_route.path).to.equal('/sign_up')
  })
})
