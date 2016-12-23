import React from 'react'
import { Header } from 'components/Header/Header'
import { signOut } from 'modules/session'
import { shallow } from 'enzyme'
import Link from 'containers/Link'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header signOut={signOut} />)
  })

  it('Renders a welcome message', () => {
    const welcome = _wrapper.find('h1')
    expect(welcome).to.exist
    expect(welcome.text()).to.match(/React Redux Starter Kit/)
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Home route', () => {
      expect(_wrapper).to.contain(
        <Link activeClassName='route--active' to='/home'>
          Home
        </Link>
      )
    })

    it('Should render a Link to Counter route', () => {
      expect(_wrapper).to.contain(
        <Link activeClassName='route--active' to='/counter'>
          Counter
        </Link>
      )
    })

    it('Should render a Link to Fun route', () => {
      expect(_wrapper).to.contain(
        <Link activeClassName='route--active' to='/fun'>
          Fun
        </Link>
      )
    })
  })
})
