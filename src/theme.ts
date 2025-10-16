import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b388eb',
      light: '#e4d7fb',
      dark: '#8c5ccf',
      contrastText: '#fff',
    },
    background: {
      default: '#f8f8f8',
      paper: '#fff',
    },
    text: {
      primary: '#222',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          backgroundColor: '#b388eb',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#a86dea',
          },
        },
        outlined: {
          borderColor: '#b388eb',
          color: '#b388eb',
          '&:hover': {
            backgroundColor: '#f3eaff',
            borderColor: '#8c5ccf',
            color: '#8c5ccf',
          },
        },
      },
    },
  },
});

export default theme;
