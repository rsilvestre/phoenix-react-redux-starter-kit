import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import autobind from 'autobind-decorator'

import { SUPPORTED_LANGUAGE } from '../../store/locale'

const messages = defineMessages({
  spanish: {
    id: 'languageSelector.spanish',
    description: 'Select language',
    defaultMessage: 'Spanish'
  },
  english: {
    id: 'languageSelector.english',
    description: 'Select language',
    defaultMessage: 'English'
  },
  french: {
    id: 'languageSelector.french',
    description: 'Select language',
    defaultMessage: 'French'
  }
})

export class LanguageSelector extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.context = context
  }

  @autobind
  _handleChange ({ target : { value } }) {
    const { pathname, search } = window.location
    // const url = `/${value}${pathname.replace(/^\/(en|fr|es)\//, '/')}${search}`
    const url = `/${value}${pathname.replace(new RegExp(`^/${SUPPORTED_LANGUAGE}/`), '/')}${search}`
    this.context.router.push(url)
    this.props.onChange(value)
  }

  render () {
    const { locale, formatMessage } = this.props.intl
    return (
      <select value={locale} onChange={this._handleChange}>
        <option id='es' value='es'>{formatMessage(messages.spanish)}</option>
        <option id='fr' value='fr'>{formatMessage(messages.french)}</option>
        <option id='en' value='en'>{formatMessage(messages.english)}</option>
      </select>
    )
  }
}

LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onChange: React.PropTypes.func.isRequired
}
export default injectIntl(LanguageSelector)
