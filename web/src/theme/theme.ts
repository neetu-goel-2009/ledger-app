import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Blue
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#7c3aed', // Purple
      light: '#a78bfa',
      dark: '#5b21b6',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Open Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
          fontWeight: 500,
          '&.MuiButton-contained': {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: '32px',
          color: 'text.secondary',
          borderRadius: 8,
          padding: '8px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'action.hover',
            color: 'text.primary',
          },
        },
      },
    },
    MuiAppBar: {
      // styleOverrides: {
      //   root: {
      //     backgroundColor: '#ffffff',
      //     borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      //     boxShadow: 'none',
      //   },
      // },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : theme.palette.background.paper,
          color: theme.palette.mode === 'light' ? theme.palette.text.primary : '#FFFFFF',
          boxShadow: theme.palette.mode === 'light' 
            ? '0 2px 8px rgba(0,0,0,0.08)' 
            : '0 2px 8px rgba(0,0,0,0.2)',
          borderBottom: `1px solid ${
            theme.palette.mode === 'light' 
              ? 'rgba(0, 0, 0, 0.06)' 
              : 'rgba(255, 255, 255, 0.06)'
          }`,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
    },
    action: {
      hover: 'rgba(255, 255, 255, 0.08)',
    },
  },
  components: {
    ...lightTheme.components,
    // MuiAppBar: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: '#1e293b',
    //       borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    //       boxShadow: 'none',
    //     },
    //   },
    // },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
