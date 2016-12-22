import {
  SESSION_ERROR,
  CURRENT_USER,
  USER_SIGNED_OUT,
  signIn,
  signOut,
  sessionError,
  getCurrentUser,
  signupPage,
  default as sessionReducer
} from 'modules/session'

const reducerInitialState = {
  currentUser: null,
  socket: null,
  channel: null,
  error: null
}

describe('(Internal Module) Session', () => {
  it('Should export a constant SESSION_ERROR.', () => {
    expect(SESSION_ERROR).to.equal('session/SESSION_ERROR')
  })
  it('Should export a constant CURRENT_USER.', () => {
    expect(CURRENT_USER).to.equal('session/CURRENT_USER')
  })
  it('Should export a constant USER_SIGNED_OUT.', () => {
    expect(USER_SIGNED_OUT).to.equal('session/USER_SIGNED_OUT')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(sessionReducer).to.be.a('function')
    })

    it('Should initialize with a state of reducerInitialState.', () => {
      expect(sessionReducer(undefined, {})).to.deep.equal(reducerInitialState)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = sessionReducer(undefined, {})
      expect(state).to.deep.equal(reducerInitialState)
      state = sessionReducer(state, { type: '@@@@@@@' })
      expect(state).to.deep.equal(reducerInitialState)

      /* const sessionState = {
        currentUser: {},
        socket: null,
        channel: null,
        error: null
      }
      state = sessionReducer(state, signIn(sessionState))
      expect(state).to.equal(sessionState)
      state = sessionReducer(state, { type: '@@@@@@@' })
      expect(state).to.equal(sessionState) */
    })
  })

  describe('(Action Creator) sessionError', () => {
    it('Should be exported as a function.', () => {
      expect(sessionError).to.be.a('function')
    })

    it('Should return an action with type "LOCATION_CHANGE".', () => {
      expect(sessionError()).to.have.property('type', SESSION_ERROR)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      const locationState = 'Invalid email or password'
      expect(sessionError(locationState)).to.have.property('payload', 'Invalid email or password')
    })

    it('Should default the "payload" property to "/" if not provided.', () => {
      expect(sessionError()).to.have.property('payload', '')
    })
  })

  describe('(Action Creator) signupPage', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
      _globalState = {
        session : sessionReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          session : sessionReducer(_globalState.session, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })
    })

    it('Should be exported as a function.', () => {
      expect(signupPage).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(signupPage()).to.be.a('function')
    })

    it('Should return a promise from that thunk that gets fulfilled.', () => {
      return Promise.resolve(signupPage()(_dispatchSpy, _getStateSpy)).should.eventually.be.fulfilled
    })

    it('Should call dispatch and getState exactly once.', () => {
      return Promise.resolve(signupPage()(_dispatchSpy, _getStateSpy))
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
        })
    })
  })

  describe('(Specialized Action Creator) getCurrentUser', () => {
    let _globalState
    let _dispatchSpy

    beforeEach(() => {
      _globalState = {
        session : sessionReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          session : sessionReducer(_globalState.session, action)
        }
      })
    })

    it('Should be exported as a function.', () => {
      expect(getCurrentUser).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(getCurrentUser()).to.be.a('function')
    })

    xit('Should return a promise from that thunk that gets fulfilled.', () => {
      return Promise.resolve(getCurrentUser()(_dispatchSpy)).should.eventually.be.fulfilled
    })

    xit('Should call dispatch and getState exactly once.', () => {
      return Promise.resolve(getCurrentUser()(_dispatchSpy))
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
        })
    })
  })

  describe('(Specialized Action Creator) signIn', () => {
    let _globalState
    let _dispatchSpy
    const user = { user: 'user', password: 'password' }

    beforeEach(() => {
      _globalState = {
        session : sessionReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          session : sessionReducer(_globalState.session, action)
        }
      })
    })

    it('Should be exported as a function.', () => {
      expect(signIn).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(signIn(user)).to.be.a('function')
    })

    xit('Should return a promise from that thunk that gets fulfilled.', () => {
      return Promise.resolve(signIn(user)(_dispatchSpy)).should.eventually.be.fulfilled
    })

    xit('Should call dispatch and getState exactly once.', () => {
      return Promise.resolve(signIn(user)(_dispatchSpy))
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
        })
    })
  })

  describe('(Specialized Action Creator) signOut', () => {
    let _globalState
    let _dispatchSpy

    beforeEach(() => {
      _globalState = {
        session : sessionReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          session : sessionReducer(_globalState.session, action)
        }
      })
    })

    it('Should be exported as a function.', () => {
      expect(signOut).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(signOut()).to.be.a('function')
    })

    xit('Should return a promise from that thunk that gets fulfilled.', () => {
      return Promise.resolve(signOut()(_dispatchSpy)).should.eventually.be.fulfilled
    })

    xit('Should call dispatch and getState exactly once.', () => {
      return Promise.resolve(signOut()(_dispatchSpy))
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
        })
    })
  })
})
