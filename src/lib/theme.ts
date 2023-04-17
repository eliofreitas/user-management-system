import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})
// Create a theme instance.
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  }
})

export default lightTheme
