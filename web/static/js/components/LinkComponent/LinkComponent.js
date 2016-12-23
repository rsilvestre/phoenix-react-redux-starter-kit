import React from 'react'
import { Link } from 'react-router'

export class LinkComponent extends React.Component {
  static propTypes = {
    locale: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.node
    ]).isRequired
  }

  render () {
    const { to, locale, children, ...rest } = this.props
    return (
      <Link {...rest} to={`/${locale}/${to}`.replace(/\/\//, '/')}>
        {children}
      </Link>
    )
  }
}

export default LinkComponent
