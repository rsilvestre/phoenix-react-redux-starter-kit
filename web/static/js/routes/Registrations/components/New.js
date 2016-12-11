import React from 'react'
import { Link } from 'react-router'
import { setDocumentTitle, renderErrorsFor } from '../../../utils'

export class New extends React.Component {
  static propTypes = {
    errors: React.PropTypes.object,
    signUp: React.PropTypes.func.isRequired
  }

  static componentDidMount () {
    setDocumentTitle('Sign up')
  }

  _handleSubmit(e) {
    e.preventDefault()
    const { signUp } = this.props

    const data = {
      first_name: this.refs.firstName.value,
      last_name: this.refs.lastName.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value
    }

    signUp(data)
  }

  render () {
    const { errors } = this.props
    return (
      <div className='view-container registrations new'>
        <form onSubmit={::this._handleSubmit} className='form-horizontal'>
          <div className='form-group'>
            <label htmlFor='firstname' className="col-sm-4 control-label">First Name</label>
            <div className='col-sm-5'>
              <input id='firstname' ref='firstName' type='text'
                className='form-control' placeholder='First name' required={true} />
              {renderErrorsFor(errors, 'first_name')}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='lastname' className="col-sm-4 control-label">Last Name</label>
            <div className='col-sm-5'>
              <input id='lastname' ref='lastName' type='text'
                className='form-control' placeholder='Last name' required={true} />
              {renderErrorsFor(errors, 'last_name')}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='email' className="col-sm-4 control-label">Email</label>
            <div className='col-sm-5'>
              <input id='email' ref='email' type='email'
                className='form-control' placeholder='Email' required={true} />
              {renderErrorsFor(errors, 'email')}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='password' className="col-sm-4 control-label">Password</label>
            <div className='col-sm-5'>
              <input id='password' ref='password' type='password'
                className='form-control' placeholder='Password' required={true} />
              {renderErrorsFor(errors, 'password')}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='passwordConfirmation' className="col-sm-4 control-label">Password Confirmation</label>
            <div className='col-sm-5'>
              <input id='passwordConfirmation' ref='passwordConfirmation'
                type='password' className='form-control' placeholder='Confirm password' required={true} />
              {renderErrorsFor(errors, 'password_confirmation')}
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-8">
              <button type="submit" className="btn btn-default">Sign up</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default New
