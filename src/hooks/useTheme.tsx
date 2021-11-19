import { PaletteType, createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

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

const ThemeContext = createContext({
  mode: {} as PaletteType,
  setMode: {} as Dispatch<SetStateAction<PaletteType>>,
});

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<PaletteType>('light');

  const theme = createTheme({
    typography: {
      fontFamily: fontFamilies,
      h6: {
        color: '#FFF',
      },
    },
    breakpoints: {},
    palette: {
      type: mode,
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
