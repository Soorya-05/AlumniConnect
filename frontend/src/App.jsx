import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Marketplace from "./pages/Marketplace";
import Portfolio from "./pages/Portfolio";
import Completed from "./pages/Completed";
import SwitchUser from "./pages/SwitchUser";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/switch-user" element={<SwitchUser />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/marketplace"
        element={
          <PrivateRoute>
            <Marketplace />
          </PrivateRoute>
        }
      />

      <Route
        path="/portfolio"
        element={
          <PrivateRoute>
            <Portfolio />
          </PrivateRoute>
        }
      />

      <Route
        path="/completed"
        element={
          <PrivateRoute>
            <Completed />
          </PrivateRoute>
        }
      />

      <Route
        path="/create-project"
        element={
          <PrivateRoute>
            <CreateProject />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
