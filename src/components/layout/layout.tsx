import { Fragment } from 'react'

import MainNavigation from './main-navigation'

export interface LayoutProps {
  children: JSX.Element
}

const Layout = (props: LayoutProps): JSX.Element => {
  const { children } = props
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  )
}

export default Layout
