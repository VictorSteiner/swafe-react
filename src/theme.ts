import { createTheme } from '@material-ui/core';

const fontFamilies = [
  'Poppins',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  'sans-serif',
].join(',');

export const theme = createTheme({
  typography: {
    fontFamily: fontFamilies,
  },
  breakpoints: {},
  palette: {},
});
