import { connect } from 'react-redux'

import LangLinkComponent from '../components/LangLinkComponent'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps, mapDispatchToProps)(LangLinkComponent)
