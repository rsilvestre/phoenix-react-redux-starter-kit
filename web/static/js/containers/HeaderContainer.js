import { connect } from 'react-redux'
import { signOut } from '../modules/session'

import Header from '../components/Header'

const mapDispatchToProps = {
  signOut: () => signOut()
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
