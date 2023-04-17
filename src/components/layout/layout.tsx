import { Fragment } from 'react'

import MainNavigation from './main-navigation'

export interface LayoutProps {
  children: JSX.Element
  toggleTheme: () => void
  currentTheme?: 'light' | 'dark'
}

const Layout = ({ children, toggleTheme, currentTheme }: LayoutProps): JSX.Element => {
  return (
    <Fragment>
      <MainNavigation toggleTheme={toggleTheme} currentTheme={currentTheme} />
      <main>{children}</main>
    </Fragment>
  )
}

export default Layout
