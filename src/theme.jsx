// src/theme.jsx
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif", // unified font across the app
  },
  palette: {
    primary: {
      main: "#09b0deff",    // brand blue
    },
    secondary: {
      main: "#3a379a",    // brand purple
    },
    warning: {
      main: "#ffe60b",    // brand yellow
    },
    error: {
      main: "#ff233b",    // brand red
    },
    background: {
      default: "#E8F4FF", // page background
    },
    text: {
      primary: "#1B1F3B",    // default text color
    },
  },
});

export default theme;
