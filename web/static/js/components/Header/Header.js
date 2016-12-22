import React from 'react'
import { IndexLink, Link } from 'react-router'
import autobind from 'autobind-decorator'
import ReactGravatar from 'react-gravatar'
import LangLink from '../../containers/LangLink'
import './Header.scss'

export class Header extends React.Component {
  static propTypes = {
    signOut: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object
  }

  _renderCurrentUser () {
    const { currentUser } = this.props

    if (!currentUser) {
      return false
    }

    const fullName = [currentUser.first_name, currentUser.last_name].join(' ')

    return (
      <li>
        <LangLink className='current-user'>
          <ReactGravatar className='react-gravatar' email={currentUser.email} protocol='https://' size={18} />
          {' '}
          {fullName}
        </LangLink>
      </li>
    )
  }

  _renderSignOutLink () {
    if (!this.props.currentUser) {
      return false
    }

    return (
      <li>
        <a href='#' className='signout-user' onClick={this._handleSignOutClick}>
          <i className='fa fa-sign-out' />
          Sign out
        </a>
      </li>
    )
  }

  _renderSignInLink () {
    if (this.props.currentUser) {
      return false
    }

    return (
      <li>
        <LangLink to='/sign_in' activeClassName='route--active'><i className='fa fa-sign-in' /> Sign in</LangLink>
      </li>
    )
  }

  _renderSignUpLink () {
    if (this.props.currentUser) {
      return false
    }

    return (
      <li>
        <LangLink to='/sign_up' activeClassName='route--active'><i className='fa fa-sign-up' /> Sign up</LangLink>
      </li>
    )
  }

  @autobind
  _handleSignOutClick (e) {
    const { signOut } = this.props

    e.preventDefault()

    signOut()
  }

  render () {
    return (
      <div>
        <nav className='navbar navbar-custom navbar-fixed-top'>
          <div className='container'>
            <div className='navbar-header'>
              <LangLink className='navbar-brand' to='/home'>Brand</LangLink>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li>
                  <LangLink to='/home' activeClassName='route--active'>
                    Home
                  </LangLink>
                </li>
                <li>
                  <LangLink to='/counter' activeClassName='route--active'>
                    Counter
                  </LangLink>
                </li>
                <li>
                  <LangLink to='/fun' activeClassName='route--active'>
                    Fun
                  </LangLink>
                </li>
              </ul>
              <ul className='nav navbar-nav navbar-right'>
                {this._renderCurrentUser()}
                {this._renderSignOutLink()}
                {this._renderSignInLink()}
                {this._renderSignUpLink()}
              </ul>
            </div>
          </div>
        </nav>
        <h1>Phoenix React Redux Starter Kit</h1>
      </div>
    )
  }
}

export default Header
