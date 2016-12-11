import React from 'react'
import { IndexLink, Link } from 'react-router'
import ReactGravatar    from 'react-gravatar';
import './Header.scss'

export class Header extends React.Component {
  static propTypes = {
    signOut: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object
  }

  _renderCurrentUser() {
    const { currentUser } = this.props

    if (!currentUser) {
      return false
    }

    const fullName = [currentUser.first_name, currentUser.last_name].join(' ')

    return (
      <li>
        <a className="current-user">
          <ReactGravatar email={currentUser.email} https /> {fullName}
        </a>
      </li>
    )
  }

  _renderSignOutLink() {
    if (!this.props.currentUser) {
      return false
    }

    return (
      <li>
        <a href="#" onClick={::this._handleSignOutClick}><i className="fa fa-sign-out"/> Sign out</a>
      </li>
    )
  }

  _renderSignUpLink() {
    if (this.props.currentUser) {
      return false
    }

    return (
      <li>
        <Link to='/sign_up'><i className="fa fa-sign-up"/> Sign up</Link>
      </li>
    )
  }

  _handleSignOutClick(e) {
    const { signOut } = this.props

    e.preventDefault()

    signOut()
  }

  render () {
    return (
      <div>
        <header className="main-header">
          <nav>
            <ul>
              <li>
                <Link to="/"><i className="fa fa-columns"/>Boards</Link>
              </li>
            </ul>
          </nav>
          <nav className="right">
            <ul>
              {this._renderCurrentUser()}
              {this._renderSignOutLink()}
              {this._renderSignUpLink()}
            </ul>
          </nav>
        </header>
        <h1>Phoenix React Redux Starter Kit</h1>
        <IndexLink to='/' activeClassName='route--active'>
          Home
        </IndexLink>
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
  }
}

export default Header
