import React from 'react'
import { SUPPORTED_LANGUAGE } from '../../store/locale'

export class Language extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    localeChange: React.PropTypes.func.isRequired,
    locale: React.PropTypes.string.isRequired,
    params: React.PropTypes.object
  }

  componentWillMount () {
    const { params: { lang }, localeChange, locale } = this.props
    if (lang && (new RegExp(SUPPORTED_LANGUAGE)).test(lang) && locale !== lang) {
      localeChange(lang)
    }
  }

  render () {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default Language
