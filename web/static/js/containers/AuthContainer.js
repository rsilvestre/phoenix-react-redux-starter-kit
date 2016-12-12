import { connect } from 'react-redux'
import { getCurrentUser, signupPage } from '../modules/session'

import Auth from '../components/Auth/Auth'

const mapDispatchToProps = {
  getCurrentUser: () => getCurrentUser(),
  signupPage: () => signupPage()
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
