import './App.css';

import Login from "./pages/Login.tsx";
import VerifyOtp from "./pages/VerifyOtp.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";

import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AdminRoute from "./components/AdminRoute.tsx";

import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/verify" element={<VerifyOtp />} />

              {/* Protected Routes */}
              <Route
                  path="/dashboard"
                  element={
                      <ProtectedRoute>
                          <Dashboard />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/admin"
                  element={
                      <AdminRoute>
                          <AdminDashboard />
                      </AdminRoute>
                  }
              />
          </Routes>
      </BrowserRouter>
  )
}

export default App
