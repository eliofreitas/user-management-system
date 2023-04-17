import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
// import classes from './main-navigation.module.css'
import { AppBar, Box, Button, IconButton, Toolbar, Typography, css } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
export interface MainNavigationProps {
  toggleTheme: () => void
  currentTheme?: 'light' | 'dark'
}

const MainNavigation = ({ toggleTheme, currentTheme }: MainNavigationProps): JSX.Element => {
  const { data, status } = useSession()
  const isAuth = status === 'authenticated'
  const logoutHandler = (): void => {
    signOut()
  }
  return (
    <header
      css={css`
        padding-bottom: 60px;
      `}
    >
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'flex' }}
            color="primary-contrast-text"
          >
            <Link
              css={css`
                color: inherit;
              `}
              href="/"
            >
              Home
            </Link>
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {!isAuth && (
              <Typography variant="h6" component="div" color="primary-contrast-text">
                <Link
                  css={css`
                    color: inherit;
                  `}
                  href="/auth"
                >
                  Login
                </Link>
              </Typography>
            )}
            {!isAuth && (
              <Typography variant="h6" component="div" color="primary-contrast-text">
                <Link
                  css={css`
                    color: inherit;
                  `}
                  href="/register"
                >
                  Register
                </Link>
              </Typography>
            )}
            {isAuth && (
              <Typography
                variant="h6"
                color="primary-contrast-text"
                component="div"
              >{`Greetings ${data?.user?.email}`}</Typography>
            )}
            {isAuth && (
              <Button color="inherit" variant="text" onClick={logoutHandler}>
                Logout
              </Button>
            )}
            <IconButton onClick={(): void => toggleTheme()} aria-label="Change Theme">
              {currentTheme === 'light' && <DarkMode />}
              {currentTheme === 'dark' && <LightMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default MainNavigation
