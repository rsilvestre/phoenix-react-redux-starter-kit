import React from 'react'
import autobind from 'autobind-decorator'
import { setDocumentTitle, renderErrorsFor } from '../../../utils'

export class New extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  }

  static propTypes = {
    errors: React.PropTypes.array,
    signUp: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    setDocumentTitle('Sign up')
  }

  @autobind
  _handleSubmit (e) {
    e.preventDefault()
    const { signUp } = this.props

    signUp(this.state.data)
  }

  @autobind
  _handleTyping (e) {
    this.setState({ data: { ...this.state.data, [e.target.id]: e.target.value } })
  }

  render () {
    const { errors } = this.props
    const { data } = this.state

    return (
      <div className='view-container registrations new'>
        <form id='sign_up_form' onSubmit={this._handleSubmit} className='form-horizontal'>
          <div className='form-group'>
            <label htmlFor='first_name' className='col-sm-4 control-label'>First Name</label>
            <div className='col-sm-5'>
              <input id='first_name' ref='first_name' type='text'
                className='form-control' placeholder='First name' required='required'
                onChange={this._handleTyping} value={data.first_name} />
              {renderErrorsFor(errors, 'first_name')}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='last_name' className='col-sm-4 control-label'>Last Name</label>
            <div className='col-sm-5'>
              <input id='last_name' ref='last_name' type='text'
                className='form-control' placeholder='Last name' required='required'
                onChange={this._handleTyping} value={data.last_name} />
              {renderErrorsFor(errors, 'last_name')}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='email' className='col-sm-4 control-label'>Email</label>
            <div className='col-sm-5'>
              <input id='email' ref='email' type='email'
                className='form-control' placeholder='Email' required='required'
                onChange={this._handleTyping} value={data.email} />
              {renderErrorsFor(errors, 'email')}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='col-sm-4 control-label'>Password</label>
            <div className='col-sm-5'>
              <input id='password' ref='password' type='password'
                className='form-control' placeholder='Password' required='required'
                onChange={this._handleTyping} value={data.password} />
              {renderErrorsFor(errors, 'password')}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='password_confirmation' className='col-sm-4 control-label'>Password Confirmation</label>
            <div className='col-sm-5'>
              <input id='password_confirmation' ref='password_confirmation'
                type='password' className='form-control' placeholder='Confirm password' required='required'
                onChange={this._handleTyping} value={data.password_confirmation} />
              {renderErrorsFor(errors, 'password_confirmation')}
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-8'>
              <button type='submit' className='btn btn-default'>Sign up</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default New
