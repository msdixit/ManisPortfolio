import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#7f5af0', light: '#9b7ff5', dark: '#5c3dc9', contrastText: '#fff' },
    secondary: { main: '#00c2ff', light: '#33ceff', dark: '#0099cc', contrastText: '#070d1a' },
    background: { default: '#070d1a', paper: 'rgba(255,255,255,0.04)' },
    text:       { primary: '#e8edf5', secondary: '#7a88a8' },
    divider:    'rgba(255,255,255,0.09)',
    success:    { main: '#2cb67d' },
    error:      { main: '#f72585' },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontFamily: '"Syne", sans-serif', fontWeight: 800, letterSpacing: '-0.04em' },
    h2: { fontFamily: '"Syne", sans-serif', fontWeight: 800, letterSpacing: '-0.03em' },
    h3: { fontFamily: '"Syne", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 600 },
    button: { fontFamily: '"DM Sans", sans-serif', fontWeight: 600 },
  },
  shape: { borderRadius: 18 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 99,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '10px 26px',
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #7f5af0, #00c2ff)',
          boxShadow: '0 4px 24px rgba(127,90,240,0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #9b7ff5, #33ceff)',
            boxShadow: '0 8px 36px rgba(127,90,240,0.5)',
            transform: 'translateY(-2px)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            borderColor: '#00c2ff',
            background: 'rgba(0,194,255,0.06)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(14px)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#0c1427',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(24px)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
            '&:hover fieldset': { borderColor: '#7f5af0' },
            '&.Mui-focused fieldset': { borderColor: '#7f5af0' },
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#7f5af0 #070d1a',
        },
      },
    },
  },
});

export default theme;
