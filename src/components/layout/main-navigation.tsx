import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
// import classes from './main-navigation.module.css'
import { AppBar, Box, Button, Toolbar, Typography, css } from '@mui/material'

const MainNavigation = (): JSX.Element => {
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex' }}>
            <Link href="/">Home</Link>
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {!isAuth && (
              <Typography variant="h6" component="div">
                <Link href="/auth">Login</Link>
              </Typography>
            )}
            {!isAuth && (
              <Typography variant="h6" component="div">
                <Link href="/register">Register</Link>
              </Typography>
            )}
            {isAuth && <Typography variant="h6">{`Greetings ${data?.user?.email}`}</Typography>}
            {isAuth && (
              <Button color="inherit" variant="text" onClick={logoutHandler}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default MainNavigation
