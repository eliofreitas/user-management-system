import Layout from '@/components/layout/layout'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { CssBaseline, Paper, Theme, ThemeProvider } from '@mui/material'
import lightTheme, { darkTheme } from '@/lib/theme'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'

const getActiveTheme = (themeMode: 'light' | 'dark'): Theme => {
  return themeMode === 'light' ? lightTheme : darkTheme
}
const PREFERENCE_COOKIE_NAME = 'theme-preference'
export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps): JSX.Element {
  const [activeTheme, setActiveTheme] = useState(lightTheme)
  const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME])
  const preferredTheme =
    cookieTheme && cookieTheme[PREFERENCE_COOKIE_NAME]
      ? cookieTheme[PREFERENCE_COOKIE_NAME]
      : 'light'
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light')
  const toggleTheme = (): void => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light'
    setSelectedTheme(desiredTheme)
    setCookieTheme(PREFERENCE_COOKIE_NAME, desiredTheme)
  }
  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme])
  useEffect(() => {
    // Workaround for next js to avoid discrepancies between server side and client side
    setSelectedTheme(preferredTheme)
  }, [preferredTheme])
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <Layout toggleTheme={toggleTheme} currentTheme={selectedTheme}>
          <Paper elevation={0}>
            <Component {...pageProps} />
          </Paper>
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  )
}
