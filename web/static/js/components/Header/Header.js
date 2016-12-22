import React from 'react'
import LangLink from '../../containers/LangLink'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Phoenix React Redux Starter Kit</h1>
    <LangLink to='/home' activeClassName='route--active'>
      Home
    </LangLink>
    {' · '}
    <LangLink to='/counter' activeClassName='route--active'>
      Counter
    </LangLink>
    {' · '}
    <LangLink to='/fun' activeClassName='route--active'>
      Fun
    </LangLink>
  </div>
)

export default Header
