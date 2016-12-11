import React from 'react'
import { Link } from 'react-router'

import { setDocumentTitle } from '../../../utils'

export class New extends React.Component {
  static propTypes = {
    signIn: React.PropTypes.func.isRequired,
    error: React.PropTypes.string
  }

  static componentDidMount () {
    setDocumentTitle('Sign in')
  }

  _handleSubmit (e) {
    e.preventDefault()

    const { signIn } = this.props
    const { email, password } = this.refs
    signIn({email: email.value, password: password.value})
  }

  _renderError() {
    const { error } = this.props

    if (!error) {
      return false
    }

    return (
      <div className='error'>
        {error}
      </div>
    )
  }

  render () {
    return (
      <div className='view-container sessions new'>
        <form onSubmit={::this._handleSubmit} className='form-horizontal'>
          {::this._renderError()}
          <div className='form-group'>
            <label htmlFor='email' className='col-sm-4 control-label'>Email</label>
            <div className='col-sm-4'>
              <input id='email' ref='email' type='email' defaultValue='john@phoenix-trello.com'
                className='form-control' placeholder='Email' required={true} />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='col-sm-4 control-label'>Password</label>
            <div className='col-sm-4'>
              <input id='password' ref='password' type='password' defaultValue='12345678'
                className='form-control' placeholder='Password' required={true} />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-8'>
              <button type='submit' className='btn btn-default'>Sign in</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default New
