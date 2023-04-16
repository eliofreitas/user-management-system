import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { CssBaseline, Paper, ThemeProvider } from '@mui/material'
import theme from '@/lib/theme'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Paper elevation={0}>
            <Component {...pageProps} />
          </Paper>
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  )
}
