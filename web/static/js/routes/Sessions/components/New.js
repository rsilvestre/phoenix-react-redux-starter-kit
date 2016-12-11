import React from 'react'
import { Link } from 'react-router'

import { setDocumentTitle } from '../../../utils'

export class New extends React.Component {
  static propTypes = {
    signIn: React.PropTypes.func.isRequired,
    error: React.PropTypes.string
  }

  componentDidMount () {
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
      <div className="error">
        {error}
      </div>
    )
  }

  render () {
    return (
      <div className='view-container sessions new'>
        <main>
          <form onSubmit={::this._handleSubmit}>
            {::this._renderError()}
            <div className="field">
              <input ref="email" type="Email" placeholder="Email" required="true" defaultValue="john@phoenix-trello.com"/>
            </div>
            <div className="field">
              <input ref="password" type="password" placeholder="Password" required="true" defaultValue="12345678"/>
            </div>
            <button type="submit">Sign in</button>
          </form>
          <Link to="/sign_up">Create new account</Link>
        </main>
      </div>
    )
  }
}

export default New
