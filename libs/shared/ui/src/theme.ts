import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F3F3F7',
    },
    primary: {
      main: '#178841',
      light: '#407505',
      dark: '#178841',
    },
    secondary: {
      main: '#007DFF',
    },
  },
  typography: {
    h1: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      letterSpacing: '0.15px',
    },
    h2: {
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: '1.875rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.175rem',
      lineHeight: '2rem',
      color: '#494949',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.5rem',
      color: '#494949',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: '1rem',
      color: '#494949',
    },
  },
});
