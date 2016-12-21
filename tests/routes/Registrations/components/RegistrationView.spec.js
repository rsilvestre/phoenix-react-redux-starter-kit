import React from 'react'
import { bindActionCreators } from 'redux'
import { New as RegistrationView } from 'routes/Registrations/components/New'
import { shallow } from 'enzyme'

describe('(Component) Registration', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      errors : null,
      ...bindActionCreators({
        signUp: (_spies.signUp = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<RegistrationView {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render 5 labels', () => {
    const labels = _wrapper.find('label')
    expect(labels).to.have.length(5)
    expect(labels.filter('[htmlFor="first_name"]').text()).to.match(/^First Name$/)
    expect(labels.filter('[htmlFor="last_name"]').text()).to.match(/^Last Name$/)
    expect(labels.filter('[htmlFor="email"]').text()).to.match(/^Email$/)
    expect(labels.filter('[htmlFor="password"]').text()).to.match(/^Password$/)
    expect(labels.filter('[htmlFor="password_confirmation"]').text()).to.match(/^Password Confirmation$/)
  })

  it('Should render 5 fields', () => {
    const inputs = _wrapper.find('input')
    expect(inputs).to.have.length(5)
    expect(inputs.filter('#first_name')).to.have.length(1)
    expect(inputs.filter('#last_name')).to.have.length(1)
    expect(inputs.filter('#email')).to.have.length(1)
    expect(inputs.filter('#password')).to.have.length(1)
    expect(inputs.filter('#password_confirmation')).to.have.length(1)
  })

  it('Should not have error element', () => {
    expect(_wrapper.not('.error')).to.have.length(1)
  })

  it('Should render error properly', () => {
    _wrapper.setProps({ errors: [{ password: 'Too short' }, { password_confirmation: 'passwords not match' }] })
    const errors = _wrapper.find('.error')
    expect(errors).to.have.length(2)
    expect(errors.at(0).text()).to.match(/Too short/)
    expect(errors.at(1).text()).to.match(/passwords not match/)
  })

  it('Should render exactly one button.', () => {
    expect(_wrapper.find('button')).to.have.length(1)
  })

  describe('A submit form button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Sign up')
    })

    it('should only have one button', () => {
      expect(_button).to.have.length(1)
    })

    it('has bootstrap classes', () => {
      expect(_button.hasClass('btn btn-default')).to.be.true
    })

    it('Should dispatch a `signUp` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      const form = _wrapper.find('form')
      const fields = _wrapper.find('input')
      fields.filter('#first_name').simulate('change', { target: { value: 'Firstname' } })
      fields.filter('#last_name').simulate('change', { target: { value: 'Lastname' } })
      fields.filter('#email').simulate('change', { target: { value: 'Email' } })
      fields.filter('#password').simulate('change', { target: { value: 'Password' } })
      fields.filter('#password_confirmation').simulate('change', { target: { value: 'Password Confirmation' } })
      form.simulate('submit', { preventDefault () {} })

      _spies.dispatch.should.have.been.called
      _spies.signUp.should.have.been.called
    })
  })
})
