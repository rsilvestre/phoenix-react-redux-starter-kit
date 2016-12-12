import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

class AppContainer extends React.Component {
  static propTypes = {
    routes : React.PropTypes.object.isRequired,
    store  : React.PropTypes.object.isRequired
  }

  static shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props
    const history = syncHistoryWithStore(browserHistory, store)

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
