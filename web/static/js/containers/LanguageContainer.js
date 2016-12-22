import React from 'react'
import { connect } from 'react-redux'

import { localeChange, SUPPORTED_LANGUAGE } from '../store/locale'

export class LanguageContainer extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    localeChange: React.PropTypes.func.isRequired,
    params: React.PropTypes.object
  }

  componentWillMount () {
    const { params: { lang }, localeChange } = this.props
    // if (lang && /(en|fr|es)/.test(lang)) {
    if (lang && (new RegExp(SUPPORTED_LANGUAGE)).test(lang)) {
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

const mapStateToProps = () => ({})

export default connect(mapStateToProps, {
  localeChange
})(LanguageContainer)
