import { findDOMNode } from 'react-dom'
import React from 'react'
import { IndexLink, Link } from 'react-router'
import autobind from 'autobind-decorator'
import ReactGravatar from 'react-gravatar'
import ReactTooltip from 'react-tooltip'
import './Header.scss'

export class Header extends React.Component {
  static propTypes = {
    signOut: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
    presences: React.PropTypes.array
  }

  componentDidUpdate (prevProps) {
    const { presences : nextPresences } = this.props
    const { presences : prevPresences } = prevProps
    if (prevPresences && nextPresences && JSON.stringify(prevPresences) !== JSON.stringify(nextPresences)) {
      const node = findDOMNode(this.refs.connectedUser)
      ReactTooltip.show(node)
      setTimeout(() => {
        ReactTooltip.hide(node)
      }, 2000)
    }
    return true
  }

  _renderCurrentUser () {
    const { currentUser, presences } = this.props
    const userCounter = presences && presences.length > 0 ? presences[0].size : 0

    if (!currentUser) {
      return false
    }

    const fullName = [currentUser.first_name, currentUser.last_name].join(' ')

    return (
      <li>
        <Link className='current-user' ref='connectedUser' data-tip data-for='connectedUser'>
          {userCounter > 1 && (
            <ReactTooltip id='connectedUser' plate='bottom' type='dark' delayHide={800} effect='solid'>
              <div>{userCounter - 1} other connection{userCounter > 2 && 's'} with the same user</div>
              {presences[0].values.map((value, index) => (
                <div key={index}>
                  {(index === 0 && (<span>you :</span>)) || (<span>other :</span>)}
                  <span>{value.time}</span>
                </div>
              ))}
            </ReactTooltip>
          )}
          {' '}
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
              <IndexLink className='navbar-brand' to='/'>Brand</IndexLink>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li>
                  <IndexLink to='/' activeClassName='route--active'>
                    Home
                  </IndexLink>
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
