import React from 'react'
import { Header } from 'components/Header/Header'
import { shallow } from 'enzyme'
import LangLink from 'containers/LangLink'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  it('Renders a welcome message', () => {
    const welcome = _wrapper.find('h1')
    expect(welcome).to.exist
    expect(welcome.text()).to.match(/React Redux Starter Kit/)
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Home route', () => {
      expect(_wrapper).to.contain(
        <LangLink activeClassName='route--active' to='/home'>
          Home
        </LangLink>
      )
    })

    it('Should render a Link to Counter route', () => {
      expect(_wrapper).to.contain(
        <LangLink activeClassName='route--active' to='/counter'>
          Counter
        </LangLink>
      )
    })

    it('Should render a Link to Fun route', () => {
      expect(_wrapper).to.contain(
        <LangLink activeClassName='route--active' to='/fun'>
          Fun
        </LangLink>
      )
    })
  })
})
