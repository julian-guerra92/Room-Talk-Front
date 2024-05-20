'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E1E1E'
    },
    secondary: {
      main: '#3A64D8'
    },
    info: {
      main: '#fff'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(204, 204, 204, 1)',
          height: 65
        },
      }
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600
        },
        h2: {
          fontSize: 20,
          fontWeight: 400
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
        size: 'large',
        disableElevation: false,
        color: 'inherit'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          "&.Mui-disabled": {
            "backgroundColor": "rgba(64,64,64,0.7)",
            "color": "rgba(0,0,0,0.7)",
            "borderColor": "rgba(0,0,0,0.12)"
          }
        }
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        }
      }
    }
  },
});

export default theme;
