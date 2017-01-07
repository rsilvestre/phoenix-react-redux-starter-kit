import { connect } from 'react-redux'
import { signOut } from '../modules/session'

import Header from '../components/Header'

const mapDispatchToProps = {
  signOut
}

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser,
  presences: session.presences
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
