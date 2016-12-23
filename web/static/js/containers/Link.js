import { connect } from 'react-redux'

import LinkComponent from '../components/LinkComponent'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps, mapDispatchToProps)(LinkComponent)
