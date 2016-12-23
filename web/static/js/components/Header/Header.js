import React from 'react'
import autobind from 'autobind-decorator'
import ReactGravatar from 'react-gravatar'
import Link from '../../containers/Link'
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
        <Link to='#' className='current-user'>
          <ReactGravatar className='react-gravatar' email={currentUser.email} protocol='https://' size={18} />
          {' '}
          {fullName}
        </Link>
      </li>
    )
  }

  _renderSignOutLink () {
    if (!this.props.currentUser) {
      return false
    }

    return (
      <li>
        <a href='/sign_in' className='signout-user' onClick={this._handleSignOutClick}>
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
        <Link to='/sign_in' activeClassName='route--active'><i className='fa fa-sign-in' /> Sign in</Link>
      </li>
    )
  }

  _renderSignUpLink () {
    if (this.props.currentUser) {
      return false
    }

    return (
      <li>
        <Link to='/sign_up' activeClassName='route--active'><i className='fa fa-sign-up' /> Sign up</Link>
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
              <Link className='navbar-brand' to='/home'>Brand</Link>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li>
                  <Link to='/home' activeClassName='route--active'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to='/counter' activeClassName='route--active'>
                    Counter
                  </Link>
                </li>
                <li>
                  <Link to='/fun' activeClassName='route--active'>
                    Fun
                  </Link>
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
