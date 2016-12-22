import 'phoenix'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

//
// Language Support
//
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
import it from 'react-intl/locale-data/it'
import es from 'react-intl/locale-data/es'
import fr from 'react-intl/locale-data/fr'

import * as messages from './i18n/'
import { LANGUAGE_STORAGE_NAME } from './store/locale'

addLocaleData(en)
addLocaleData(de)
addLocaleData(it)
addLocaleData(es)
addLocaleData(fr)

const languageDefault = localStorage.getItem(LANGUAGE_STORAGE_NAME) || 'en'
const initialLanguage = {
  intl: {
    locale: languageDefault,
    messages: messages[languageDefault]
  }
}

// ========================================================
// Store Instantiation
// ========================================================
const windowInitialState = window.___INITIAL_STATE__ || {}
const initialState = { ...initialLanguage, ...windowInitialState }
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

const start = () => {
  // This code is excluded from production bundle
  if (__DEV__) {
    if (module.hot) {
      // Development render functions
      const renderApp = render
      const renderError = (error) => {
        const RedBox = require('redbox-react').default

        ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
      }

      // Wrap render in try/catch
      render = () => {
        try {
          renderApp()
        } catch (error) {
          renderError(error)
        }
      }

      // Setup hot module replacement
      module.hot.accept('./routes/index', () =>
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE)
          render()
        })
      )
    }
  }

  // ========================================================
  // Go!
  // ========================================================
  render()
}

// All modern browsers, expect `Safari`, have implemented
// the `ECMAScript Internationalization API`.
// For that we need to patch in on runtime.
if (!global.Intl) {
  require.ensure(['intl'], (require) => {
    require('intl')
    start()
  }, 'IntlBundle')
} else {
  start()
}
