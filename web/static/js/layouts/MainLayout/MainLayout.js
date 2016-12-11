import React from 'react'

export const MainLayout = ({ children }) => (
  <div>
    {children}
  </div>
)

MainLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default MainLayout
