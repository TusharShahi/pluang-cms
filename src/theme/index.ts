import { createTheme } from '@mui/material/styles';

export const COLORS = {
  primary: '#1d4289',
  secondary: '#ededed',
};

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 500,
      color: COLORS.secondary,
      marginBottom: '1rem',
      lineHeight: '1.5',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: COLORS.secondary,
      marginBottom: '1rem',
      lineHeight: '1.5',
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: theme.spacing(2),
          borderRadius: '25px 25px 0 25px',
          letterSpacing: '1px',
          padding: theme.spacing(1),
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#000',
        },
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#000',
        },
      }
    },
  },
});

export default theme;
