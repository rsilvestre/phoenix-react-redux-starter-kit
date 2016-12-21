import {
  REGISTRATION_ERROR,
  registrationError,
  signUp,
  default as registrationReducer
} from 'routes/Registrations/modules/registration'

const registrationInitialState = {
  errors: null
}

describe('(Redux Module) Registration', () => {
  it('Should export a constant REGISTRATION_ERROR.', () => {
    expect(REGISTRATION_ERROR).to.equal('registration/REGISTRATION_ERROR')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(registrationReducer).to.be.a('function')
    })

    it('Should initialize with a state of registrationInitialState (object).', () => {
      expect(registrationReducer(undefined, {})).to.deep.equal(registrationInitialState)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = registrationReducer(undefined, {})
      expect(state).to.deep.equal(registrationInitialState)
      state = registrationReducer(state, { type: '@@@@@@@' })
      expect(state).to.deep.equal(registrationInitialState)
      state = registrationReducer(state, registrationError([
        { password: 'should be at least 5 character(s)' }
      ]))
      expect(state).to.deep.equal({ errors: [
        {
          password: 'should be at least 5 character(s)'
        }
      ] })
      state = registrationReducer(state, { type: '@@@@@@@' })
      expect(state).to.deep.equal({ errors: [
        {
          password: 'should be at least 5 character(s)'
        }
      ] })
    })
  })

  describe('(Action Creator) registrationError', () => {
    it('Should be exported as a function.', () => {
      expect(registrationError).to.be.a('function')
    })

    it('Should return an action with type "REGISTRATION_ERROR".', () => {
      expect(registrationError()).to.have.property('type', REGISTRATION_ERROR)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(registrationError([])).to.have.property('payload').that.is.an('array').with.length(0)
    })

    it('Should default the "payload" property to 1 if not provided.', () => {
      expect(registrationError()).to.have.property('payload').that.is.an('array').with.length(0)
    })
  })

  describe('(Action Creator) signUp', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
      _globalState = {
        counter: registrationReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          counter: registrationReducer(_globalState.counter, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })
    })

    it('Should be exported as a function.', () => {
      expect(signUp).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(signUp()).to.be.a('function')
    })

    xit('Should return a promise from that thunk that gets fulfilled.', () => {
      return signUp()(_dispatchSpy, _getStateSpy).should.eventually.be.fulfilled
    })

    xit('Should call dispatch and getState exactly once.', () => {
      return signUp()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
        })
    })

    xit('Should produce a state that is double the previous state.', () => {
      _globalState = { counter: 2 }

      return signUp()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          expect(_globalState.counter).to.equal(4)
          return signUp()(_dispatchSpy, _getStateSpy)
        })
        .then(() => {
          _dispatchSpy.should.have.been.calledTwice
          expect(_globalState.counter).to.equal(8)
        })
    })
  })

  // NOTE: if you have a more complex state, you will probably want to verify
  // that you did not mutate the state. In this case our state is just a number
  // (which cannot be mutated).
  describe('(Action Handler) ERROR_REGISTRATION', () => {
    it('Should modify the state by the action payload\'s "value" property.', () => {
      let state = registrationReducer(undefined, {})
      expect(state).to.deep.equal(registrationInitialState)
      state = registrationReducer(state, registrationError([
        { password: 'should be at least 5 character(s)' }
      ]))
      expect(state).to.deep.equal({ errors: [
        {
          password: 'should be at least 5 character(s)'
        }
      ] })
    })
  })
})
