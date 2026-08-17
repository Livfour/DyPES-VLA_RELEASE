import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'
import './styles.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#315f55',
      dark: '#183d36',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#b9575d',
    },
    background: {
      default: '#f7f9f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#17221f',
      secondary: '#53615d',
    },
    divider: '#d6ddda',
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 500,
      fontSize: '4.5rem',
      lineHeight: 1.02,
      letterSpacing: 0,
    },
    h2: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 500,
      fontSize: '2.65rem',
      lineHeight: 1.12,
      letterSpacing: 0,
    },
    h3: {
      fontWeight: 650,
      fontSize: '1.25rem',
      lineHeight: 1.3,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 650,
      textTransform: 'none',
      letterSpacing: 0,
    },
    overline: {
      fontWeight: 700,
      letterSpacing: 0,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 42,
          borderRadius: 4,
          boxShadow: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          textTransform: 'none',
          fontWeight: 650,
          letterSpacing: 0,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: '#17221f',
          background: '#eef2f0',
        },
      },
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
