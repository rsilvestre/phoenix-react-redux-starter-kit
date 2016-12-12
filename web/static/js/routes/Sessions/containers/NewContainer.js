import { connect } from 'react-redux'
import { signIn } from '../../../modules/session'

import New from '../components/New'

const mapDispatchToProps = {
  signIn: (data) => signIn(data)
}

const mapStateToProps = ({ session }) => ({
  error: session.error
})

export default connect(mapStateToProps, mapDispatchToProps)(New)
