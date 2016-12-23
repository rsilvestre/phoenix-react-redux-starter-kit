import React from 'react'
import Link from '../../containers/Link'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Phoenix React Redux Starter Kit</h1>
    <Link to='/home' activeClassName='route--active'>
      Home
    </Link>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    {' · '}
    <Link to='/fun' activeClassName='route--active'>
      Fun
    </Link>
  </div>
)

export default Header
