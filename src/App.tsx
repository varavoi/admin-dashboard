import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Toast from "./components/ui/Toast";
import { useToast } from './hooks/useToast';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const { toast, hideToast } = useToast();
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
        <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={hideToast}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
