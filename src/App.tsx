import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/analytics"
              element={<Analytics/>}
            />
            <Route
              path="/settings"
              element={<Settings/>}
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
