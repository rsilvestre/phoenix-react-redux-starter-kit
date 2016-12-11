import React from 'react'

export class Auth extends React.Component {
  static propTypes = {
    children : React.PropTypes.element.isRequired,
    getCurrentUser: React.PropTypes.func.isRequired,
    signupPage: React.PropTypes.func.isRequired
  }

  render() {
    const {children} = this.props
    
    return (
      <div>
        {children}
      </div>
    )
  }
}


export default Auth
