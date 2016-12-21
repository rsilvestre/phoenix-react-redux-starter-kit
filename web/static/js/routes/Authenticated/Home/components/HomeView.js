import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import DuckImage from '../assets/Duck.png'
import './HomeView.scss'

const messages = defineMessages({
  welcome: {
    id: 'home.welcome',
    description: 'Welcome to the homepage',
    defaultMessage: 'Welcome to the Phoenix React Redux Starter Kit'
  }
})

export const HomeView = () => (
  <div>
    <h4><FormattedMessage {...messages.welcome} /></h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={DuckImage} />
  </div>
)

export default HomeView
