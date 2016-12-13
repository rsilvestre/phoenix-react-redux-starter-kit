import { connect } from 'react-redux'
import { localeChange } from '../store/locale'

import LanguageSelector from '../components/LanguageSelector/LanguageSelector'

const mapDispatchToProps = {
  onChange: (value) => localeChange(value)
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector)
