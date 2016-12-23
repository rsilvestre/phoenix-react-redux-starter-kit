import { connect } from 'react-redux'

import { localeChange } from '../store/locale'
import Language from '../components/Language'

const mapDispatchToProps = {
  localeChange
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps, mapDispatchToProps)(Language)
