import React from 'react'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-intl-redux'

//
// Analytics support
//
import ReactGA from 'react-ga'
ReactGA.initialize('UA-89843122-1')

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

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
          <Router history={history} children={routes} onUpdate={logPageView} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
