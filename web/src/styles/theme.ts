import { createTheme } from "@mui/material/styles";
import themeJSON from "./theme.json";

const theme = createTheme({
  palette: {
    mode: 'light', // Add theme mode
    primary: {
      main: "#2196F3", // Vibrant orange for food theme
      light: "#FF8A65",
      dark: "#E64A19",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2E7D32", // Green for freshness
      light: "#4CAF50",
      dark: "#1B5E20",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    error: {
      main: "#D32F2F",
    },
    warning: {
      main: "#FF9800",
    },
    success: {
      main: "#388E3C",
    },
    info: {
      main: "#1976D2",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.875rem",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: "12px 24px",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2196F3",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2196F3",
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiAppBar: {
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
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E0E0E0",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E0E0E0",
          margin: "16px 0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(255, 107, 53, 0.4)",
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          "& .MuiRating-iconFilled": {
            color: "#FF9800",
          },
          "& .MuiRating-iconHover": {
            color: "#FF9800",
          },
        },
      },
    },
    // Enhanced styles for panels and popups
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          maxWidth: "90vw",
          maxHeight: "90vh",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#2196F3",
          color: "#FFFFFF",
          borderRadius: "16px 16px 0 0",
          padding: "20px 24px",
          "& .MuiTypography-root": {
            fontWeight: 600,
            fontSize: "1.25rem",
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "24px",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
          backgroundColor: "#FAFAFA",
          borderRadius: "0 0 16px 16px",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          border: "1px solid #E0E0E0",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: "8px 0",
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 8px",
          "&:hover": {
            backgroundColor: "rgba(255, 107, 53, 0.08)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 107, 53, 0.12)",
            "&:hover": {
              backgroundColor: "rgba(255, 107, 53, 0.16)",
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 8px",
          "&:hover": {
            backgroundColor: "rgba(255, 107, 53, 0.08)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 107, 53, 0.12)",
            "&:hover": {
              backgroundColor: "rgba(255, 107, 53, 0.16)",
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 500,
          color: "#212121",
        },
        secondary: {
          color: "#757575",
          fontSize: "0.875rem",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 107, 53, 0.05)",
          color: "#2196F3",
          fontWeight: 600,
          fontSize: "0.875rem",
          lineHeight: 1.5,
          padding: "12px 16px",
          borderRadius: "8px 8px 0 0",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#757575",
          "&:hover": {
            backgroundColor: "rgba(255, 107, 53, 0.08)",
            color: "#2196F3",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontWeight: 600,
          color: "#212121",
        },
        body1: {
          color: "#424242",
        },
        body2: {
          color: "#757575",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E0E0E0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2196F3",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2196F3",
            borderWidth: "2px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#757575",
          "&.Mui-focused": {
            color: "#2196F3",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          marginLeft: 0,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

// Create dark theme variant
export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
});

export const lightTheme = theme; // Export light theme
export default theme;
