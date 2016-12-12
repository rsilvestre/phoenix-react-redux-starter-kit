import { connect } from 'react-redux'
import { signUp } from '../modules/registration'

import New from '../components/New'

const mapDispatchToProps = {
  signUp: (data) => signUp(data)
}

const mapStateToProps = ({ registration }) => ({
  errors: registration.errors
})

export default connect(mapStateToProps, mapDispatchToProps)(New)
