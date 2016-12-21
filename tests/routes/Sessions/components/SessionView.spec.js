import React from 'react'
import { bindActionCreators } from 'redux'
import { New as SessionView } from 'routes/Sessions/components/New'
import { shallow } from 'enzyme'

describe('(Component) Sessions', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      error : null,
      ...bindActionCreators({
        signIn: (_spies.signIn = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<SessionView {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render 2 labels', () => {
    const labels = _wrapper.find('label')
    expect(labels).to.have.length(2)
    expect(labels.filter('[htmlFor="email"]').text()).to.match(/^Email$/)
    expect(labels.filter('[htmlFor="password"]').text()).to.match(/^Password$/)
  })

  it('Should render 2 fields', () => {
    const inputs = _wrapper.find('input')
    expect(inputs).to.have.length(2)
    expect(inputs.filter('#email')).to.have.length(1)
    expect(inputs.filter('#password')).to.have.length(1)
  })

  it('Should not have error element', () => {
    expect(_wrapper.not('.error')).to.have.length(1)
  })

  it('Should render error properly', () => {
    _wrapper.setProps({ error: 'Invalid email or password' })
    const errors = _wrapper.find('.error')
    expect(errors).to.have.length(1)
    expect(errors.at(0).text()).to.match(/Invalid email or password/)
  })

  it('Should render exactly one button.', () => {
    expect(_wrapper.find('button')).to.have.length(1)
  })

  describe('A submit form button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Sign in')
    })

    it('should only have one button', () => {
      expect(_button).to.have.length(1)
    })

    it('has bootstrap classes', () => {
      expect(_button.hasClass('btn btn-default')).to.be.true
    })

    it('Should dispatch a `signIn` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      const form = _wrapper.find('form')
      const fields = _wrapper.find('input')
      fields.filter('#email').simulate('change', { target: { value: 'Email' } })
      fields.filter('#password').simulate('change', { target: { value: 'Password' } })
      form.simulate('submit', { preventDefault () {} })

      _spies.dispatch.should.have.been.called
      _spies.signIn.should.have.been.called
    })
  })
})
