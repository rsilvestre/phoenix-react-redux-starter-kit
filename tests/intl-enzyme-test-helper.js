import React from 'react'
import { mount, shallow } from 'enzyme'
import {
  IntlProvider,
  intlShape
} from 'react-intl'
import * as messages from 'i18n'

const intlProvider = new IntlProvider({ locale: 'en' }, messages)
const { intl } = intlProvider.getChildContext()

function nodeWithIntlProp (node) {
  return React.cloneElement(node, { intl })
}

export const shallowWithIntl = (node) => {
  return shallow(nodeWithIntlProp(node), { context: { intl } })
}

export const mountWithIntl = (node) => {
  return mount(nodeWithIntlProp(node), {
    context: { intl },
    childContextTypes: { intl: intlShape }
  })
}
