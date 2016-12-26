import React from 'react'
import { HomeView } from 'routes/Authenticated/Home/components/HomeView'
import { mountWithIntl } from '../../../../intl-enzyme-test-helper'

describe('(View) Home', () => {
  let _component

  beforeEach(() => {
    _component = mountWithIntl(<HomeView />)
  })

  it('Renders a welcome message', () => {
    const welcome = _component.find('h4')
    expect(welcome).to.exist
    expect(welcome.text()).to.match(/Welcome to the Phoenix React Redux Starter Kit/)
  })

  it('Renders an awesome duck image', () => {
    const duck = _component.find('img')
    expect(duck).to.exist
    expect(duck.prop('alt')).to.match(/This is a duck, because Redux!/)
  })
})
