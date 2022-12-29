import "./App.css";
import Home from "./pages/Home";
// for the theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
// for the routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
