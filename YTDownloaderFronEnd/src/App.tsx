import "./App.css";
import Inputs from "./componants/inputs";
// for the theme
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#242424",
    },
    secondary: {
      main: "#242424",
    },
    background: {
      default: "#242424",
      paper: "#242424",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.87)",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Inputs />
      </div>
    </ThemeProvider>
  );
};

export default App;
