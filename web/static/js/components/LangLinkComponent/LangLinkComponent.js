import React from 'react'
import { Link } from 'react-router'

export class LangLink extends React.Component {
  static propTypes = {
    locale: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]).isRequired
  }

  render () {
    const { to, locale, children, ...rest } = this.props
    return (
      <Link {...rest} to={`/${locale}${to}`}>
        {children}
      </Link>
    )
  }
}

export default LangLink
